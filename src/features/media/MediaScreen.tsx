import { useMemo, useState } from 'react';
import styles from './Media.module.css';
import { MediaDrawer } from './MediaDrawer';
import { mediaMarkets } from '../../data/media';
import type { MediaItem } from '../../data/media';
import { useAppStore } from '../../store/appStore';
import {
  MEDIA_PAGE_SIZE,
  filteredMedia,
  mediaPageItems,
  mediaStatusOf,
} from '../../store/selectors';
import type { MediaKindFilter, MediaStatusFilter } from '../../store/types';
import {
  Button,
  Card,
  IconDocument,
  IconUpload,
  Input,
  Photo,
  ProgressBar,
  SegmentedControl,
  Select,
  cx,
} from '../../design-system';

const KIND_OPTIONS = [
  { value: 'All', label: 'All media' },
  { value: 'Images', label: 'Images' },
  { value: 'Videos', label: 'Videos' },
] as const;

const STATUS_OPTIONS = ['Any status', 'Needs review', 'Tagged', 'Confirmed'] as const;

/** Stable empty reference so the tag memo does not recompute every render. */
const EMPTY_LIBRARY: MediaItem[] = [];

export function MediaScreen() {
  const state = useAppStore();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [picked, setPicked] = useState(false);

  const all = state.mediaItems ?? EMPTY_LIBRARY;
  const filtered = filteredMedia(state);
  const pages = Math.max(1, Math.ceil(filtered.length / MEDIA_PAGE_SIZE));
  const page = Math.min(state.mediaPage, pages - 1);
  const tiles = mediaPageItems({ ...state, mediaPage: page }, filtered);

  const reviewCount = all.filter(
    (item) => mediaStatusOf(state, item) === 'Needs review',
  ).length;

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    all.forEach((item) =>
      item.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [all]);

  const statusDot = (id: string) => {
    const item = all.find((entry) => entry.id === id)!;
    const status = mediaStatusOf(state, item);
    if (status === 'Needs review') return styles.dotWarn;
    if (status === 'Confirmed') return styles.dotInk;
    return styles.dotOk;
  };

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Media manager</h1>
          <p className={styles.meta}>
            {all.length.toLocaleString('en-US')} files ·{' '}
            {all.filter((item) => item.kind === 'Image').length.toLocaleString('en-US')}{' '}
            images · {all.filter((item) => item.kind === 'Video').length} videos
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={() =>
              state.setMediaFilter({ mediaStatus: 'Needs review', mediaSelId: null })
            }
          >
            Review queue
            <span className={styles.count}>{reviewCount}</span>
          </Button>
          <Button onClick={() => setUploadOpen((open) => !open)}>
            {uploadOpen ? 'Hide upload' : 'Upload media'}
          </Button>
        </div>
      </div>

      {uploadOpen && (
        <div className={styles.upload}>
          <div className={styles.drop} onClick={() => setPicked(true)}>
            <IconUpload size={22} />
            <span className={styles.dropTitle}>Drop images or video here</span>
            <span className={styles.dropMeta}>
              JPG, PNG, MP4 or a zip · up to 2 GB per batch
            </span>
            <Button variant="secondary" size="sm" style={{ marginTop: 8 }}>
              Browse files
            </Button>
          </div>

          {picked && (
            <Card>
              <div className={styles.file}>
                <span className={styles.fileIcon}>
                  <IconDocument size={20} />
                </span>
                <span className={styles.fileBody}>
                  <span className={styles.fileName}>spring-shoot-batch.zip</span>
                  <br />
                  <span className={styles.fileMeta}>412 MB · 18 files</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setPicked(false)}>
                  Remove
                </Button>
              </div>

              <div className={styles.fileActions}>
                <Button disabled={state.mediaBusy} onClick={state.ingestMedia}>
                  {state.mediaBusy ? 'Ingesting…' : 'Ingest and tag'}
                </Button>
                <span className={styles.fileMeta}>
                  The agent writes a description and tags for each file
                </span>
              </div>
            </Card>
          )}
        </div>
      )}

      {state.mediaBusy && (
        <Card>
          <div className={styles.ingestMeta}>
            <span>Ingesting and tagging</span>
            <span>{Math.round(state.mediaProgress)}%</span>
          </div>
          <ProgressBar value={state.mediaProgress} label="Ingesting and tagging" />
        </Card>
      )}

      <div className={styles.filters}>
        <Input
          value={state.mediaQuery}
          placeholder="Search descriptions and tags"
          aria-label="Search descriptions and tags"
          onChange={(event) => state.setMediaFilter({ mediaQuery: event.target.value })}
        />
        <SegmentedControl
          options={KIND_OPTIONS}
          value={state.mediaKind}
          aria-label="Media type"
          onChange={(value) =>
            state.setMediaFilter({ mediaKind: value as MediaKindFilter })
          }
        />
        <Select
          value={state.mediaMarket === 'All' ? 'All markets' : state.mediaMarket}
          options={['All markets', ...mediaMarkets]}
          aria-label="Market"
          onChange={(event) =>
            state.setMediaFilter({
              mediaMarket:
                event.target.value === 'All markets' ? 'All' : event.target.value,
            })
          }
        />
        <Select
          value={state.mediaStatus === 'All' ? 'Any status' : state.mediaStatus}
          options={STATUS_OPTIONS}
          aria-label="Status"
          onChange={(event) =>
            state.setMediaFilter({
              mediaStatus: (event.target.value === 'Any status'
                ? 'All'
                : event.target.value) as MediaStatusFilter,
            })
          }
        />
        <Select
          value={state.mediaTag || 'All tags'}
          options={['All tags', ...topTags]}
          aria-label="Tag"
          onChange={(event) =>
            state.setMediaFilter({
              mediaTag: event.target.value === 'All tags' ? '' : event.target.value,
            })
          }
        />
        <Button
          variant="ghost"
          onClick={() =>
            state.setMediaFilter({
              mediaQuery: '',
              mediaKind: 'All',
              mediaMarket: 'All',
              mediaStatus: 'All',
              mediaTag: '',
            })
          }
        >
          Clear
        </Button>
      </div>

      <Card>
        <div className={styles.resultBar}>
          <span className={styles.resultLabel}>
            {filtered.length === 0
              ? 'No files match'
              : `${page * MEDIA_PAGE_SIZE + 1}–${Math.min(
                  filtered.length,
                  (page + 1) * MEDIA_PAGE_SIZE,
                )} of ${filtered.length.toLocaleString('en-US')}`}
          </span>
          <div className={styles.pager}>
            <span className={styles.pageLabel}>
              Page {page + 1} of {pages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page === 0}
              onClick={() => state.patch({ mediaPage: Math.max(0, page - 1) })}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= pages - 1}
              onClick={() => state.patch({ mediaPage: Math.min(pages - 1, page + 1) })}
            >
              Next
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div>
            <p className={styles.dropTitle}>No files match</p>
            <p className={styles.fileMeta}>Clear a filter or widen the search.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {tiles.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cx(
                  styles.tile,
                  state.mediaSelId === item.id && styles.tileSelected,
                )}
                onClick={() => state.patch({ mediaSelId: item.id })}
              >
                <Photo
                  src={item.src}
                  tone={item.tone}
                  alt={item.desc}
                  className={styles.thumb}
                >
                  <span className={cx(styles.statusDot, statusDot(item.id))} />
                  {item.kind === 'Video' && (
                    <span className={styles.duration}>{item.duration}</span>
                  )}
                </Photo>
                <span className={styles.tileName}>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </Card>

      <MediaDrawer />
    </div>
  );
}

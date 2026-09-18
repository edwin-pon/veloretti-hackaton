import { useCallback, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/appStore';

export interface CanvasViewport {
  zoom: number;
  x: number;
  y: number;
  dragging: boolean;
  onPointerDown: (event: React.PointerEvent) => void;
  onPointerMove: (event: React.PointerEvent) => void;
  onPointerUp: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
}

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 1.6;
/** Fit never shrinks past this — below it the copy stops being readable, and
 *  the canvas is pannable anyway. */
const MIN_FIT_ZOOM = 0.45;
const MAX_FIT_ZOOM = 1;

const clamp = (value: number) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));

/** Pan, zoom and fit-to-content behaviour for the asset canvas. Panning only
 *  starts on the background so cards stay clickable. */
export function useCanvasViewport(
  viewportRef: React.RefObject<HTMLDivElement | null>,
  planeRef: React.RefObject<HTMLDivElement | null>,
  contentKey: string,
): CanvasViewport {
  const { canvasZoom, canvasX, canvasY, canvasDragging, setZoom, setPan, setDragging } =
    useAppStore();
  const panOrigin = useRef<{ x: number; y: number; startX: number; startY: number } | null>(
    null,
  );

  const fit = useCallback(() => {
    const viewport = viewportRef.current;
    const plane = planeRef.current;
    if (!viewport || !plane) return;

    const width = plane.scrollWidth;
    const height = plane.scrollHeight;
    if (!width || !height) return;

    const scale = Math.max(
      MIN_FIT_ZOOM,
      Math.min(
        MAX_FIT_ZOOM,
        Math.min(
          (viewport.clientWidth - 32) / width,
          (viewport.clientHeight - 32) / height,
        ),
      ),
    );
    setZoom(Number(scale.toFixed(3)));
    setPan(
      Math.max(0, (viewport.clientWidth - width * scale) / 2),
      Math.max(0, (viewport.clientHeight - height * scale) / 2),
    );
  }, [planeRef, setPan, setZoom, viewportRef]);

  // Fit once the plane has laid out, and again whenever the asset set changes.
  useEffect(() => {
    const frame = requestAnimationFrame(() => fit());
    return () => cancelAnimationFrame(frame);
  }, [fit, contentKey]);

  useEffect(() => {
    const onResize = () => fit();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [fit]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey && Math.abs(event.deltaY) < 2) return;
      event.preventDefault();
      const { canvasZoom: current } = useAppStore.getState();
      setZoom(Number(clamp(current - event.deltaY * 0.0015).toFixed(2)));
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [setZoom, viewportRef]);

  const onPointerDown = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-canvas-card]')) return;
    panOrigin.current = {
      x: event.clientX,
      y: event.clientY,
      startX: canvasX,
      startY: canvasY,
    };
    setDragging(true);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const origin = panOrigin.current;
    if (!origin) return;
    setPan(
      origin.startX + (event.clientX - origin.x),
      origin.startY + (event.clientY - origin.y),
    );
  };

  const onPointerUp = () => {
    panOrigin.current = null;
    if (canvasDragging) setDragging(false);
  };

  return {
    zoom: canvasZoom,
    x: canvasX,
    y: canvasY,
    dragging: canvasDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    zoomIn: () => setZoom(Number(clamp(canvasZoom + 0.1).toFixed(2))),
    zoomOut: () => setZoom(Number(clamp(canvasZoom - 0.1).toFixed(2))),
    fit,
  };
}

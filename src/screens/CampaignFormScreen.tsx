import { BIKE_MODELS, CHANNELS, MARKETS } from '../data/campaign-form'
import { Button, Label, SelectField, TextArea, TextField } from '../ds'
import { campaignWebhook } from '../lib/campaign-api'
import { useCampaign } from '../lib/campaign-store'
import { useStore } from '../lib/store'

/**
 * The campaign, in six questions.
 *
 * Everything here is an answer someone types or picks. There is no extraction,
 * no confidence and no citation, because nothing on this screen was read out of
 * a document: it is a brief being written, not a brief being recovered.
 */
export default function CampaignFormScreen() {
  const { go } = useStore()
  const { state, missing, pushing, fillExample, set, toggle, setDraft, addAudience, removeAudience, send } =
    useCampaign()
  const { input } = state

  return (
    <div style={{ maxWidth: 720 }}>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('campaigns')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to campaigns
      </button>

      <div><Label>New campaign</Label></div>
      <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 20px' }}>
        {input.name.trim() || 'What are we running?'}
      </h1>
      <p
        style={{
          fontSize: 'var(--fs-body-l)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-secondary)',
          margin: '0 0 56px',
          maxWidth: '58ch',
          textWrap: 'pretty',
        }}
      >
        Answer these six and the studio hands them to the agent, inside the brand rules you
        confirmed. What comes back is drafted against those rules, not against a blank page.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
          padding: '20px 0',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: 48,
        }}
      >
        <Label style={{ color: 'var(--vr-ink)', whiteSpace: 'nowrap' }}>Demo shortcut</Label>
        <Button variant="secondary" onClick={fillExample}>
          Fill in an example campaign
        </Button>
        <span
          style={{
            fontSize: 'var(--fs-body-s)',
            color: 'var(--text-muted)',
            maxWidth: '48ch',
            textWrap: 'pretty',
          }}
        >
          For demos only. Answers all six with a worked example, written for this build rather than
          taken from a real plan. Everything stays editable.
        </span>
      </div>

      <Field label="Campaign name" hint="Names the campaign everywhere it appears" required>
        <TextField
          value={input.name}
          onChange={(value) => set('name', value)}
          placeholder="Back to School"
          ariaLabel="Campaign name"
        />
      </Field>

      <Field
        label="Description"
        hint="What the campaign is about, who it is for and what it has to do"
        required
      >
        <TextArea
          rows={6}
          value={input.description}
          onChange={(value) => set('description', value)}
          ariaLabel="Description"
        />
      </Field>

      <Field label="Markets" hint="Language and legal rules follow the market" required>
        <Options
          options={MARKETS.map((market) => ({ key: market.key, label: market.label }))}
          selected={input.markets}
          onToggle={(key) => toggle('markets', key)}
        />
      </Field>

      <Field label="Channels" hint="Which platforms the agent drafts for" required>
        <Options
          options={CHANNELS.map((channel) => ({ key: channel.key, label: channel.label }))}
          selected={input.channels}
          onToggle={(key) => toggle('channels', key)}
        />
      </Field>

      <Field label="Audience" hint="Add as many as the campaign speaks to">
        <div>
          {input.audiences.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {input.audiences.map((audience, index) => (
                <span
                  key={`${audience}-${index}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    height: 'var(--control-h-sm)',
                    padding: '0 8px 0 16px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-default)',
                    fontSize: 'var(--fs-body-s)',
                  }}
                >
                  {audience}
                  <button
                    type="button"
                    aria-label={`Remove ${audience}`}
                    onClick={() => removeAudience(index)}
                    style={{
                      width: 20,
                      height: 20,
                      display: 'grid',
                      placeItems: 'center',
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      fontSize: 15,
                      lineHeight: 1,
                      color: 'var(--vr-gray-500)',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault()
              addAudience()
            }}
            style={{ display: 'flex', gap: 10 }}
          >
            <div style={{ flex: 1 }}>
              <TextField
                value={state.draft}
                onChange={setDraft}
                placeholder="Commuters returning to the office"
                ariaLabel="Add an audience"
              />
            </div>
            <button
              type="submit"
              style={{
                height: 44,
                padding: '0 22px',
                borderRadius: 999,
                border: '1.5px solid var(--vr-black)',
                background: 'transparent',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: 'pointer',
                flex: 'none',
              }}
            >
              Add
            </button>
          </form>
        </div>
      </Field>

      <Field label="Bike model" hint="One model for now">
        <SelectField
          value={input.bikeModel}
          onChange={(value) => set('bikeModel', value)}
          options={[...BIKE_MODELS]}
          ariaLabel="Bike model"
        />
      </Field>

      <div
        style={{
          borderTop: '1px solid var(--border-default)',
          paddingTop: 32,
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <Button onClick={send} disabled={missing.length > 0 || pushing || !campaignWebhook}>
          {pushing ? 'Sending…' : 'Send to the agent'}
        </Button>
        <span
          style={{
            fontSize: 'var(--fs-body-s)',
            color: state.outcome?.status === 'failed' ? 'var(--accent-ink)' : 'var(--text-muted)',
            maxWidth: '52ch',
            textWrap: 'pretty',
          }}
        >
          {state.outcome?.status === 'failed'
            ? state.outcome.detail
            : !campaignWebhook
              ? 'No webhook is configured. Set VITE_N8N_CAMPAIGN_URL.'
              : missing.length
                ? `Still needs ${missing.join(', ')}.`
                : 'Everything the agent needs is here.'}
        </span>
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 'var(--fs-body)', fontWeight: 500 }}>
          {label}
          {required && (
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> · required</span>
          )}
        </div>
        <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 4 }}>
          {hint}
        </div>
      </div>
      {children}
    </section>
  )
}

function Options({
  options,
  selected,
  onToggle,
}: {
  options: Array<{ key: string; label: string }>
  selected: string[]
  onToggle: (key: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map((option) => {
        const on = selected.includes(option.key)
        return (
          <label
            key={option.key}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              height: 44,
              padding: '0 20px',
              borderRadius: 'var(--radius-pill)',
              border: `1.5px solid ${on ? 'var(--vr-ink)' : 'var(--border-default)'}`,
              background: on ? 'var(--vr-ink)' : 'transparent',
              color: on ? 'var(--vr-white)' : 'var(--vr-ink)',
              fontSize: 'var(--fs-body-s)',
              cursor: 'pointer',
              transition: 'var(--transition-control)',
            }}
          >
            <input
              type="checkbox"
              checked={on}
              onChange={() => onToggle(option.key)}
              style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
            />
            {option.label}
          </label>
        )
      })}
    </div>
  )
}

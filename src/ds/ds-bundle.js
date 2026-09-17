/* @ds-bundle: {"format":4,"namespace":"DatalabDesignSystem_adceb3","components":[{"name":"Accordion","sourcePath":"components/data/Accordion.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"AlertBanner","sourcePath":"components/feedback/AlertBanner.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"ModalDialog","sourcePath":"components/feedback/ModalDialog.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"SearchBar","sourcePath":"components/forms/SearchBar.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"SliderInput","sourcePath":"components/forms/SliderInput.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Divider","sourcePath":"components/layout/Divider.jsx"},{"name":"Drawer","sourcePath":"components/layout/Drawer.jsx"},{"name":"Stack","sourcePath":"components/layout/Stack.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"MenuDropdown","sourcePath":"components/navigation/MenuDropdown.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ProductHero","sourcePath":"ui_kits/product-page/ProductHero.jsx"},{"name":"ResultsPreview","sourcePath":"ui_kits/product-page/ResultsPreview.jsx"},{"name":"CTASection","sourcePath":"ui_kits/website/CTASection.jsx"},{"name":"ContactModal","sourcePath":"ui_kits/website/ContactModal.jsx"},{"name":"DocsPage","sourcePath":"ui_kits/website/DocsPage.jsx"},{"name":"FocusAreas","sourcePath":"ui_kits/website/FocusAreas.jsx"},{"name":"Header","sourcePath":"ui_kits/website/Header.jsx"},{"name":"Hero","sourcePath":"ui_kits/website/Hero.jsx"},{"name":"StatBand","sourcePath":"ui_kits/website/StatBand.jsx"}],"sourceHashes":{"components/data/Accordion.jsx":"0ba22f9e377b","components/data/Avatar.jsx":"5b19f991fd4a","components/data/DataTable.jsx":"6a2c3216711d","components/data/EmptyState.jsx":"329a60fcf13e","components/feedback/AlertBanner.jsx":"7551284f378f","components/feedback/Badge.jsx":"a55c8178a84d","components/feedback/ModalDialog.jsx":"6a46166a81f8","components/feedback/ProgressBar.jsx":"6a4af7d58683","components/feedback/Skeleton.jsx":"5ed97750ef60","components/feedback/Spinner.jsx":"ecc2e1105f72","components/feedback/Toast.jsx":"a1e22ed35e5d","components/feedback/Tooltip.jsx":"49daca970ecb","components/forms/Checkbox.jsx":"9cf59808e196","components/forms/Field.jsx":"c67e52ee5073","components/forms/RadioGroup.jsx":"542922178986","components/forms/SearchBar.jsx":"94326a879f6f","components/forms/Select.jsx":"c84d2a76ba01","components/forms/SliderInput.jsx":"6570b6154977","components/forms/TextInput.jsx":"51c5f09a6673","components/forms/Toggle.jsx":"d251496d2baf","components/layout/Divider.jsx":"55723602b2f2","components/layout/Drawer.jsx":"df2efb37fa06","components/layout/Stack.jsx":"27d75c692998","components/navigation/Breadcrumbs.jsx":"a819a2e575a4","components/navigation/MenuDropdown.jsx":"c500090fb3f1","components/navigation/Pagination.jsx":"5ea874381247","components/navigation/Stepper.jsx":"5cb96dddf6cb","components/navigation/Tabs.jsx":"041114ad80a3","ui_kits/product-page/ProductHero.jsx":"3bb3c53e7593","ui_kits/product-page/ResultsPreview.jsx":"d9c1ac768514","ui_kits/product-page/primitives.jsx":"38a8e72b5742","ui_kits/website/CTASection.jsx":"cec1d38de12c","ui_kits/website/ContactModal.jsx":"7e6b20260298","ui_kits/website/DocsPage.jsx":"6233a16204aa","ui_kits/website/FocusAreas.jsx":"e6bd4f216e42","ui_kits/website/Header.jsx":"443e766e4dfd","ui_kits/website/Hero.jsx":"cd17979a1c42","ui_kits/website/StatBand.jsx":"c370259a6fd7","ui_kits/website/primitives.jsx":"cf1cdf7414ff"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DatalabDesignSystem_adceb3 = window.DatalabDesignSystem_adceb3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Accordion.jsx
try { (() => {
// Accordion.jsx — collapsible sections
function Accordion({
  items = [],
  single = true,
  defaultOpen = []
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = i => setOpen(open.includes(i) ? open.filter(x => x !== i) : single ? [i] : [...open, i]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      fontFamily: '"PT Sans", sans-serif'
    }
  }, items.map((it, i) => {
    const is = open.includes(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: "1px solid #D1DDE8"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      "aria-expanded": is,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "16px 4px",
        fontFamily: '"PT Sans", sans-serif',
        fontWeight: 700,
        fontSize: 16,
        color: "#002C47",
        textAlign: "left",
        gap: 16
      }
    }, it.title, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        fontSize: 12,
        color: "#5C7185",
        transform: is ? "rotate(180deg)" : "none",
        transition: "transform 150ms"
      }
    }, "\u25BC")), is && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 4px 18px",
        fontSize: 15,
        lineHeight: 1.6,
        color: "#5C7185"
      }
    }, it.content));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
// Avatar.jsx — image or initials on a brand-tinted circle
const avatarTones = {
  sky: "#DAE7FE",
  purple: "#B399FF",
  mint: "#52E9C0",
  navy: "#002C47"
};
function Avatar({
  name = "",
  src,
  size = 40,
  tone = "sky"
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  const bg = avatarTones[tone] || avatarTones.sky;
  return src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      flex: "none"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-label": name,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: bg,
      color: tone === "navy" ? "#FFFFFF" : "#002C47",
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: Math.round(size * 0.38)
    }
  }, initials || "?");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
// DataTable.jsx — sortable table with optional built-in pagination
function DataTable({
  columns = [],
  rows = [],
  pageSize = 0,
  initialSort = null
}) {
  const [sort, setSort] = React.useState(initialSort); // { key, dir: "asc"|"desc" }
  const [page, setPage] = React.useState(1);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const x = a[sort.key],
        y = b[sort.key];
      const cmp = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);
  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const visible = pageSize ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;
  const toggleSort = col => {
    if (!col.sortable) return;
    setPage(1);
    setSort(sort && sort.key === col.key && sort.dir === "asc" ? {
      key: col.key,
      dir: "desc"
    } : {
      key: col.key,
      dir: "asc"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    onClick: () => toggleSort(c),
    style: {
      textAlign: c.align || "left",
      padding: "12px 14px",
      fontSize: 14,
      fontWeight: 700,
      color: "#002C47",
      borderBottom: "2px solid #D1DDE8",
      cursor: c.sortable ? "pointer" : "default",
      userSelect: "none",
      whiteSpace: "nowrap"
    }
  }, c.label, c.sortable && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontSize: 11,
      color: sort && sort.key === c.key ? "#002C47" : "#D1DDE8"
    }
  }, sort && sort.key === c.key ? sort.dir === "asc" ? "▲" : "▼" : "▲"))))), /*#__PURE__*/React.createElement("tbody", null, visible.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: i % 2 ? "#F0F4F8" : "transparent"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: "12px 14px",
      textAlign: c.align || "left",
      color: "#5C7185",
      borderBottom: "1px solid #D1DDE8"
    }
  }, r[c.key])))))), pageSize > 0 && pageCount > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 12,
      marginTop: 14,
      fontSize: 14,
      color: "#5C7185"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Page ", page, " of ", pageCount), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(Math.max(1, page - 1)),
    disabled: page <= 1,
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      border: "none",
      background: "#F0F4F8",
      color: "#002C47",
      cursor: "pointer",
      opacity: page <= 1 ? 0.35 : 1
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(Math.min(pageCount, page + 1)),
    disabled: page >= pageCount,
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      border: "none",
      background: "#F0F4F8",
      color: "#002C47",
      cursor: "pointer",
      opacity: page >= pageCount ? 0.35 : 1
    }
  }, "\u2192")));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/EmptyState.jsx
try { (() => {
// EmptyState.jsx — reusable empty/error/loading-state pattern
function EmptyState({
  glyph = "○",
  title = "Nothing here yet",
  description,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 12,
      padding: "48px 32px",
      fontFamily: '"PT Sans", sans-serif'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "#DAE7FE",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26,
      color: "#002C47"
    }
  }, glyph), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 22,
      color: "#002C47"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.6,
      color: "#5C7185",
      maxWidth: 380
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/AlertBanner.jsx
try { (() => {
// AlertBanner.jsx — inline alert, light-surface variant
const alertTones = {
  info: {
    border: "#B399FF",
    bg: "#F5F1FF",
    fg: "#002C47",
    icon: "ℹ"
  },
  success: {
    border: "#52E9C0",
    bg: "#EAFBF5",
    fg: "#002C47",
    icon: "✓"
  },
  warning: {
    border: "#F59E0B",
    bg: "#FFF7E8",
    fg: "#7A4E00",
    icon: "!"
  },
  error: {
    border: "#EF4444",
    bg: "#FDEDED",
    fg: "#8C1C1C",
    icon: "✕"
  }
};
function AlertBanner({
  variant = "info",
  title,
  children,
  onClose
}) {
  const t = alertTones[variant] || alertTones.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "14px 16px",
      background: t.bg,
      borderLeft: `4px solid ${t.border}`,
      borderRadius: 12,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 15,
      lineHeight: 1.5,
      color: t.fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      flex: "none",
      fontSize: 12,
      fontWeight: 700,
      background: t.border,
      color: "#002C47",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, t.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      marginBottom: children ? 2 : 0
    }
  }, title), children), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      color: t.fg,
      fontSize: 16,
      lineHeight: 1,
      padding: 2
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { AlertBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/AlertBanner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
// Badge.jsx — small status/label tag (8px radius per brand spec)
const badgeTones = {
  navy: {
    bg: "#002C47",
    fg: "#FFFFFF"
  },
  mint: {
    bg: "#52E9C0",
    fg: "#002C47"
  },
  purple: {
    bg: "#B399FF",
    fg: "#002C47"
  },
  sky: {
    bg: "#DAE7FE",
    fg: "#002C47"
  },
  neutral: {
    bg: "#F0F4F8",
    fg: "#5C7185"
  },
  error: {
    bg: "#FDEDED",
    fg: "#B91C1C"
  },
  warning: {
    bg: "#FFF7E8",
    fg: "#B45309"
  }
};
function Badge({
  children,
  tone = "sky",
  style = {}
}) {
  const t = badgeTones[tone] || badgeTones.sky;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      background: t.bg,
      color: t.fg,
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.5px",
      borderRadius: 8,
      padding: "4px 10px",
      whiteSpace: "nowrap",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ModalDialog.jsx
try { (() => {
// ModalDialog.jsx — generic modal with backdrop; also covers confirmation dialogs via actions
function ModalDialog({
  open,
  onClose,
  title,
  children,
  actions,
  width = 480,
  inline = false
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: inline ? "relative" : "fixed",
      inset: inline ? "auto" : 0,
      zIndex: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, !inline && /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,44,71,0.45)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: "relative",
      background: "#FFFFFF",
      borderRadius: 20,
      padding: 32,
      width,
      maxWidth: "100%",
      boxShadow: "0 8px 32px rgba(0,44,71,0.22)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 26,
      lineHeight: 1.25,
      color: "#002C47"
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      flex: "none",
      background: "#F0F4F8",
      color: "#002C47",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      color: "#5C7185"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "flex-end",
      marginTop: 24
    }
  }, actions)));
}
Object.assign(__ds_scope, { ModalDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ModalDialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
// ProgressBar.jsx — determinate progress
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true
}) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
      fontFamily: '"PT Sans", sans-serif'
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "#002C47"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#5C7185"
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    style: {
      height: 8,
      borderRadius: 999,
      background: "#F0F4F8",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      borderRadius: 999,
      background: "#52E9C0",
      transition: "width 300ms ease-out"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
// Skeleton.jsx — loading placeholder; lines>1 renders a text block
function Skeleton({
  width = "100%",
  height = 16,
  circle = false,
  lines = 1,
  style = {}
}) {
  const pulse = "@keyframes dl-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }";
  const bar = (w, key) => /*#__PURE__*/React.createElement("span", {
    key: key,
    style: {
      display: "block",
      width: w,
      height: circle ? width : height,
      borderRadius: circle ? "50%" : 8,
      background: "#DAE7FE",
      animation: "dl-pulse 1.4s ease-in-out infinite",
      ...style
    }
  });
  if (lines <= 1) return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("style", null, pulse), bar(width));
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("style", null, pulse), Array.from({
    length: lines
  }, (_, i) => bar(i === lines - 1 ? "60%" : width, i)));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
// Spinner.jsx — indeterminate loading indicator
function Spinner({
  size = 24,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    role: "status",
    "aria-label": "Loading",
    style: {
      display: "inline-block",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes dl-spin { to { transform: rotate(360deg); } }"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: size,
      height: size,
      boxSizing: "border-box",
      border: `${Math.max(2, size / 8)}px solid ${onDark ? "rgba(255,255,255,0.2)" : "#DAE7FE"}`,
      borderTopColor: onDark ? "#52E9C0" : "#002C47",
      borderRadius: "50%",
      animation: "dl-spin 700ms linear infinite"
    }
  }));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
// Toast.jsx — transient snackbar, bottom-centered; auto-dismiss optional
function Toast({
  open,
  message,
  variant = "info",
  onClose,
  duration = 4000,
  inline = false
}) {
  React.useEffect(() => {
    if (!open || !duration || !onClose) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);
  if (!open) return null;
  const accent = {
    info: "#B399FF",
    success: "#52E9C0",
    warning: "#F59E0B",
    error: "#EF4444"
  }[variant] || "#B399FF";
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: inline ? "static" : "fixed",
      left: inline ? "auto" : "50%",
      bottom: inline ? "auto" : 24,
      transform: inline ? "none" : "translateX(-50%)",
      zIndex: 200,
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      background: "#002C47",
      color: "#FFFFFF",
      borderRadius: 20,
      padding: "14px 20px",
      boxShadow: "0 8px 32px rgba(0,44,71,0.35)",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: accent,
      flex: "none"
    }
  }), message, onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "rgba(255,255,255,0.7)",
      fontSize: 16,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
// Tooltip.jsx — hover/focus tooltip
function Tooltip({
  label,
  side = "top",
  children
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-block"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      zIndex: 120,
      whiteSpace: "nowrap",
      background: "#002C47",
      color: "#FFFFFF",
      borderRadius: 8,
      padding: "7px 12px",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 13,
      boxShadow: "0 8px 32px rgba(0,44,71,0.22)"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
// Checkbox.jsx — custom checkbox with label
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      color: disabled ? "#5C7185" : "#002C47",
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: 8,
      flex: "none",
      boxSizing: "border-box",
      border: checked ? "none" : "2px solid #5C7185",
      background: checked ? "#002C47" : "#FFFFFF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 150ms"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 5.5L4.2 8.5L11 1.5",
    stroke: "#52E9C0",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
// Field.jsx — form field wrapper: label, helper text, error message
function Field({
  label,
  helper,
  error,
  required = false,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: '"PT Sans", sans-serif'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: "#002C47"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#EF4444"
    }
  }, " *")), children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#EF4444"
    }
  }, error) : helper && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#5C7185"
    }
  }, helper));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
// RadioGroup.jsx — radio button set
function RadioGroup({
  value,
  onChange,
  options = [],
  name,
  direction = "column"
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction,
      gap: direction === "row" ? 24 : 12
    }
  }, options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    const active = value === opt.value;
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontFamily: '"PT Sans", sans-serif',
        fontSize: 16,
        color: "#002C47"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      checked: active,
      value: opt.value,
      onChange: () => onChange && onChange(opt.value),
      style: {
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        flex: "none",
        boxSizing: "border-box",
        border: active ? "7px solid #002C47" : "2px solid #5C7185",
        background: "#FFFFFF",
        transition: "border 150ms"
      }
    }), opt.label);
  }));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchBar.jsx
try { (() => {
// SearchBar.jsx — sky-tinted search field per brand spec (20px radius, magnifier left)
function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search…",
  style = {}
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 48,
      padding: "0 20px",
      background: "#DAE7FE",
      borderRadius: 20,
      boxSizing: "border-box",
      width: "100%",
      border: focus ? "2px solid #002C47" : "2px solid transparent",
      transition: "border 150ms",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    "aria-hidden": "true",
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6",
    stroke: "#002C47",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.5 12.5L16.5 16.5",
    stroke: "#002C47",
    strokeWidth: "2",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && onSubmit) onSubmit(e.target.value);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      color: "#002C47"
    }
  }));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
// Select.jsx — styled native select
function Select({
  value,
  onChange,
  options = [],
  placeholder,
  error = false,
  disabled = false,
  style = {}
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value ?? "",
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      color: value ? "#002C47" : "#5C7185",
      background: disabled ? "#F0F4F8" : "#FFFFFF",
      appearance: "none",
      WebkitAppearance: "none",
      border: error ? "2px solid #EF4444" : focus ? "2px solid #002C47" : "1.5px solid #D1DDE8",
      borderRadius: 12,
      padding: "0 44px 0 16px",
      height: 48,
      outline: "none",
      boxShadow: focus && !error ? "0 0 0 4px rgba(0,44,71,0.12)" : "none",
      width: "100%",
      boxSizing: "border-box",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "border-color 150ms, box-shadow 150ms"
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 16,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#002C47",
      fontSize: 12
    }
  }, "\u25BE"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/SliderInput.jsx
try { (() => {
// SliderInput.jsx — range slider with optional value readout
function SliderInput({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  unit = ""
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      fontFamily: '"PT Sans", sans-serif',
      width: "100%"
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "#002C47"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#5C7185"
    }
  }, value, unit)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      WebkitAppearance: "none",
      appearance: "none",
      width: "100%",
      height: 6,
      borderRadius: 999,
      background: `linear-gradient(to right, #52E9C0 ${pct}%, #D1DDE8 ${pct}%)`,
      outline: "none",
      cursor: "pointer",
      accentColor: "#002C47"
    }
  }));
}
Object.assign(__ds_scope, { SliderInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SliderInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// TextInput.jsx — text input / textarea (multiline). type supports "date" etc.
function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  rows = 4,
  error = false,
  disabled = false,
  style = {}
}) {
  const [focus, setFocus] = React.useState(false);
  const base = {
    fontFamily: '"PT Sans", sans-serif',
    fontSize: 16,
    color: "#002C47",
    background: disabled ? "#F0F4F8" : "#FFFFFF",
    border: error ? "2px solid #EF4444" : focus ? "2px solid #002C47" : "1.5px solid #D1DDE8",
    borderRadius: 12,
    padding: multiline ? "12px 16px" : "0 16px",
    height: multiline ? "auto" : 48,
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
    boxShadow: focus && !error ? "0 0 0 4px rgba(0,44,71,0.12)" : "none",
    transition: "border-color 150ms, box-shadow 150ms",
    resize: "vertical",
    cursor: disabled ? "not-allowed" : "text",
    ...style
  };
  const props = {
    value,
    placeholder,
    disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: base
  };
  return multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, props)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, props));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
// Toggle.jsx — switch
function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      color: "#002C47",
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 48,
      height: 28,
      borderRadius: 999,
      flex: "none",
      position: "relative",
      background: checked ? "#52E9C0" : "#D1DDE8",
      transition: "background 150ms"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 23 : 3,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: checked ? "#002C47" : "#FFFFFF",
      boxShadow: "0 1px 3px rgba(0,44,71,0.3)",
      transition: "left 150ms, background 150ms"
    }
  })), label);
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/layout/Divider.jsx
try { (() => {
// Divider.jsx — hairline separator
function Divider({
  vertical = false,
  spacing = 16,
  style = {}
}) {
  return vertical ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: "stretch",
      background: "#D1DDE8",
      margin: `0 ${spacing}px`,
      ...style
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: "100%",
      background: "#D1DDE8",
      margin: `${spacing}px 0`,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Divider.jsx", error: String((e && e.message) || e) }); }

// components/layout/Drawer.jsx
try { (() => {
// Drawer.jsx — side panel over a backdrop
function Drawer({
  open,
  onClose,
  side = "right",
  width = 400,
  title,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,44,71,0.45)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      [side]: 0,
      width,
      maxWidth: "90vw",
      background: "#FFFFFF",
      boxShadow: "0 8px 32px rgba(0,44,71,0.22)",
      display: "flex",
      flexDirection: "column",
      padding: 24,
      boxSizing: "border-box",
      borderRadius: side === "right" ? "20px 0 0 20px" : "0 20px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 24,
      color: "#002C47"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      background: "#F0F4F8",
      color: "#002C47",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      color: "#5C7185"
    }
  }, children)));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/layout/Stack.jsx
try { (() => {
// Stack.jsx — flex layout primitive with token-based gap
function Stack({
  direction = "column",
  gap = 16,
  align,
  justify,
  wrap = false,
  style = {},
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: direction,
      gap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? "wrap" : "nowrap",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Stack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Stack.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
// Breadcrumbs.jsx
function Breadcrumbs({
  items = [],
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, items.map((it, i) => {
    const item = typeof it === "string" ? {
      label: it
    } : it;
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: item.label + i
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        color: "#002C47",
        fontWeight: 700
      }
    }, item.label) : /*#__PURE__*/React.createElement("a", {
      href: item.href || "#",
      onClick: e => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(item, i);
        }
      },
      style: {
        color: "#5C7185",
        textDecoration: "none"
      }
    }, item.label), !last && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "#D1DDE8"
      }
    }, "/"));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MenuDropdown.jsx
try { (() => {
// MenuDropdown.jsx — button-triggered dropdown menu with outside-click close
function MenuDropdown({
  label = "Menu",
  items = [],
  align = "left"
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    "aria-haspopup": "menu",
    "aria-expanded": open,
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: "0.5px",
      background: open ? "#013A5E" : "#002C47",
      color: "#FFFFFF",
      border: "none",
      borderRadius: 20,
      padding: "13px 24px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, label, " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: 11
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      [align]: 0,
      minWidth: 200,
      zIndex: 50,
      background: "#FFFFFF",
      borderRadius: 12,
      padding: 8,
      boxShadow: "0 8px 32px rgba(0,44,71,0.22)"
    }
  }, items.map((it, i) => it === "-" ? /*#__PURE__*/React.createElement("div", {
    key: "d" + i,
    style: {
      height: 1,
      background: "#D1DDE8",
      margin: "6px 8px"
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: it.label,
    role: "menuitem",
    onClick: () => {
      setOpen(false);
      it.onClick && it.onClick();
    },
    style: {
      display: "block",
      width: "100%",
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 15,
      color: it.destructive ? "#EF4444" : "#002C47",
      background: "transparent",
      borderRadius: 8,
      padding: "10px 12px"
    },
    onMouseEnter: e => e.currentTarget.style.background = "#F0F4F8",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, it.label))));
}
Object.assign(__ds_scope, { MenuDropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MenuDropdown.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
// Pagination.jsx
function Pagination({
  page = 1,
  pageCount = 1,
  onChange
}) {
  const go = p => {
    if (p >= 1 && p <= pageCount && onChange) onChange(p);
  };
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p);else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  const btn = active => ({
    minWidth: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontFamily: '"PT Sans", sans-serif',
    fontWeight: 700,
    fontSize: 14,
    background: active ? "#002C47" : "transparent",
    color: active ? "#FFFFFF" : "#002C47",
    transition: "background 150ms"
  });
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Pagination",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Previous page",
    onClick: () => go(page - 1),
    disabled: page <= 1,
    style: {
      ...btn(false),
      opacity: page <= 1 ? 0.35 : 1,
      background: "#F0F4F8"
    }
  }, "\u2190"), pages.map((p, i) => p === "…" ? /*#__PURE__*/React.createElement("span", {
    key: "e" + i,
    style: {
      padding: "0 6px",
      color: "#5C7185",
      fontFamily: '"PT Sans", sans-serif'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    "aria-current": p === page ? "page" : undefined,
    onClick: () => go(p),
    style: btn(p === page)
  }, p)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Next page",
    onClick: () => go(page + 1),
    disabled: page >= pageCount,
    style: {
      ...btn(false),
      opacity: page >= pageCount ? 0.35 : 1,
      background: "#F0F4F8"
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
// Stepper.jsx — wizard progress steps
function Stepper({
  steps = [],
  current = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      width: "100%"
    }
  }, steps.map((s, i) => {
    const done = i < current,
      active = i === current,
      last = i === steps.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        display: "flex",
        alignItems: "flex-start",
        flex: last ? "none" : 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-current": active ? "step" : undefined,
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        boxSizing: "border-box",
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"PT Sans", sans-serif',
        fontWeight: 700,
        fontSize: 15,
        background: done ? "#52E9C0" : active ? "#002C47" : "#FFFFFF",
        color: done ? "#002C47" : active ? "#FFFFFF" : "#5C7185",
        border: done || active ? "none" : "2px solid #D1DDE8"
      }
    }, done ? "✓" : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"PT Sans", sans-serif',
        fontSize: 13,
        textAlign: "center",
        maxWidth: 110,
        fontWeight: active ? 700 : 400,
        color: active ? "#002C47" : "#5C7185"
      }
    }, s)), !last && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 2,
        background: done ? "#52E9C0" : "#D1DDE8",
        margin: "17px 8px 0",
        borderRadius: 1
      }
    }));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
// Tabs.jsx — mint underline active indicator per brand spec
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: 28,
      borderBottom: "1px solid #D1DDE8"
    }
  }, tabs.map(t => {
    const tab = typeof t === "string" ? {
      id: t,
      label: t
    } : t;
    const is = active === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      role: "tab",
      "aria-selected": is,
      onClick: () => onChange && onChange(tab.id),
      style: {
        fontFamily: '"PT Sans", sans-serif',
        fontWeight: 700,
        fontSize: 16,
        color: is ? "#002C47" : "#5C7185",
        background: "none",
        border: "none",
        padding: "12px 2px",
        cursor: "pointer",
        borderBottom: is ? "2px solid #52E9C0" : "2px solid transparent",
        marginBottom: -1,
        transition: "color 150ms, border-color 150ms"
      }
    }, tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product-page/ProductHero.jsx
try { (() => {
// ProductHero.jsx — reusable dark hero for a technical/developer product page.
// Adapts the Datalab marketing hero (navy surface, mint accent, scattered
// geometric shapes) for a product where the primary action is a single input
// + CTA (a "paste-and-go" command bar), not a marketing CTA.
// Reuses Button, Chip, Eyebrow from primitives.jsx.
// All copy below is placeholder — override every prop for a real project.

function InputBar({
  onSubmit,
  placeholder,
  ctaLabel
}) {
  const [value, setValue] = React.useState("");
  const submit = () => onSubmit && onSubmit(value);
  return /*#__PURE__*/React.createElement("div", {
    className: "ph-inputbar",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "#FFFFFF",
      borderRadius: 999,
      padding: 6,
      width: "100%",
      maxWidth: 660,
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "ph-input",
    value: value,
    onChange: e => setValue(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") submit();
    },
    placeholder: placeholder,
    "aria-label": placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      color: "#002C47",
      padding: "14px 20px"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: submit,
    style: {
      flex: "none"
    }
  }, ctaLabel, " ", /*#__PURE__*/React.createElement("span", {
    className: "ph-arrow",
    style: {
      display: "inline-block",
      transition: "transform 150ms"
    }
  }, "\u2192")));
}
function FeaturePill({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.85)",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "transparent",
      borderRadius: 6,
      padding: "6px 12px",
      whiteSpace: "nowrap"
    }
  }, children);
}
function Reveal({
  delay = 0,
  mounted,
  reduce,
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 1,
      transform: mounted || reduce ? "none" : "translateY(8px)",
      transition: "transform 260ms ease-out",
      transitionDelay: (mounted ? delay : 0) + "ms",
      willChange: "transform",
      ...style
    }
  }, children);
}
function ProductHero({
  eyebrow = "A product by Pon Datalab",
  headline = "Your product, explained in one line.",
  subhead = "One or two sentences on the core value — lead with the outcome your customer gets, not the feature list.",
  placeholder = "you@company.com",
  ctaLabel = "Get started",
  onSubmit,
  onExample,
  examples = ["Example A", "Example B", "Example C"],
  highlightsLabel = "Highlights",
  highlights = ["Feature one", "Feature two", "Feature three", "Feature four"]
}) {
  const [mounted, setMounted] = React.useState(false);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  React.useEffect(() => {
    const id = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "ph-hero"
  }, /*#__PURE__*/React.createElement(HeroStyles, null), /*#__PURE__*/React.createElement("div", {
    className: "ph-shapes",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh sh-sky-circle"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sh sh-purple-square"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sh sh-mint-circle"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sh sh-sky-square"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ph-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph-content"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 0,
    mounted: mounted,
    reduce: reduce
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onDark: true
  }, eyebrow)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 60,
    mounted: mounted,
    reduce: reduce
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ph-h1"
  }, headline)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    mounted: mounted,
    reduce: reduce
  }, /*#__PURE__*/React.createElement("p", {
    className: "ph-subhead"
  }, subhead)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180,
    mounted: mounted,
    reduce: reduce,
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(InputBar, {
    onSubmit: onSubmit,
    placeholder: placeholder,
    ctaLabel: ctaLabel
  })), examples && examples.length > 0 && /*#__PURE__*/React.createElement(Reveal, {
    delay: 240,
    mounted: mounted,
    reduce: reduce,
    style: {
      marginTop: -4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph-examples"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph-examples-lead"
  }, "Or try:"), examples.map(ex => /*#__PURE__*/React.createElement("span", {
    key: ex,
    onClick: () => onExample && onExample(ex)
  }, /*#__PURE__*/React.createElement(Chip, null, ex))))), highlights && highlights.length > 0 && /*#__PURE__*/React.createElement(Reveal, {
    delay: 300,
    mounted: mounted,
    reduce: reduce,
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph-highlights"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph-highlights-label"
  }, highlightsLabel), /*#__PURE__*/React.createElement("div", {
    className: "ph-pills"
  }, highlights.map(d => /*#__PURE__*/React.createElement(FeaturePill, {
    key: d
  }, d))))))));
}
function HeroStyles() {
  return /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `
      .ph-hero {
        position: relative; overflow: hidden;
        background: var(--navy, #002C47);
        min-height: 640px; display: flex; align-items: center;
        padding: 120px 32px 96px; box-sizing: border-box;
      }
      .ph-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; width: 100%; }
      .ph-content { max-width: 720px; display: flex; flex-direction: column; gap: 24px; }
      .ph-h1 {
        margin: 0; font-family: "PT Serif", serif; font-weight: 700;
        font-size: 64px; line-height: 1.1; letter-spacing: -0.5px; color: #FFFFFF;
        max-width: 720px;
      }
      .ph-subhead {
        margin: 0; font-family: "PT Sans", sans-serif; font-weight: 400;
        font-size: 20px; line-height: 1.6; color: rgba(255,255,255,0.75); max-width: 620px;
      }

      /* Input bar interactions */
      .ph-inputbar { transition: box-shadow 150ms ease-out; }
      .ph-inputbar:focus-within { box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 0 0 2px var(--mint, #52E9C0); }
      .ph-input::placeholder { color: #94A3B8; }
      .ph-inputbar button:hover .ph-arrow { transform: translateX(4px); }

      /* Examples */
      .ph-examples { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: -4px; }
      .ph-examples-lead { font-family: "PT Sans", sans-serif; font-size: 14px; color: rgba(255,255,255,0.6); margin-right: 4px; }
      .ph-examples span > span { transition: background 150ms; }
      .ph-examples span:hover > span { background: #E8F0FF !important; }

      /* Highlights */
      .ph-highlights { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
      .ph-highlights-label {
        font-family: "PT Sans", sans-serif; font-weight: 700; font-size: 11px;
        letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.4);
      }
      .ph-pills { display: flex; gap: 8px; flex-wrap: wrap; }

      /* Decorative shapes */
      .ph-shapes { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
      .ph-shapes .sh { position: absolute; display: block; }
      .sh-sky-circle    { top: 30px;  right: 9%;  width: 400px; height: 400px; border-radius: 50%; background: #DAE7FE; opacity: 0.15; }
      .sh-purple-square { top: 250px; right: 9%;  width: 200px; height: 200px; border-radius: 32px; background: #B399FF; opacity: 0.20; transform: rotate(-25deg); }
      .sh-mint-circle   { top: 60px;  right: 13%; width: 140px; height: 140px; border-radius: 50%; background: #52E9C0; opacity: 0.20; }
      .sh-sky-square    { top: 280px; left: -60px; width: 300px; height: 300px; border-radius: 40px; background: #DAE7FE; opacity: 0.08; transform: rotate(15deg); }

      @media (max-width: 1100px) {
        .sh-mint-circle, .sh-purple-square { display: none; }
        .sh-sky-circle { right: -80px; width: 320px; height: 320px; }
      }
      @media (max-width: 880px) {
        .ph-hero { padding: 64px 24px 48px; min-height: 0; }
        .ph-h1 { font-size: 40px; }
        .ph-subhead { font-size: 18px; }
        .ph-inputbar { max-width: 100%; }
        .sh-sky-circle { display: none; }
        .ph-shapes .sh-sky-square { display: block; left: -120px; top: auto; bottom: -120px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ph-inputbar button:hover .ph-arrow { transform: none; }
      }
    `
    }
  });
}
Object.assign(window, {
  ProductHero,
  InputBar,
  FeaturePill
});
Object.assign(__ds_scope, { ProductHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product-page/ProductHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product-page/ResultsPreview.jsx
try { (() => {
// ResultsPreview.jsx — generic dark "results/detail" page below a ProductHero.
// Demonstrates the tech-mode components (surfaces, code blocks, status pills,
// score ring) on the same navy dark canvas. Content is a placeholder example —
// swap in real product output for a live project.

function ScoreRing({
  score = 82
}) {
  const deg = Math.round(score / 100 * 360);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 132,
      height: 132,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 132,
      height: 132,
      borderRadius: "50%",
      background: `conic-gradient(var(--mint) ${deg}deg, rgba(255,255,255,0.10) ${deg}deg)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 12,
      borderRadius: "50%",
      background: "var(--surface-1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 38,
      color: "var(--fg-strong)",
      lineHeight: 1
    }
  }, score), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg-muted)",
      letterSpacing: "0.5px"
    }
  }, "/ 100")));
}
function Panel({
  title,
  badge,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dl-surface",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 18px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--fg-strong)"
    }
  }, title), badge), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, children));
}
function ResultsPreview({
  subject = "example.com",
  scoreLabel = "Score"
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "product-results",
    style: {
      background: "var(--bg-page-tech)",
      padding: "0 32px 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "8px 0 28px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-status dl-status-success"
  }, "Analysis complete"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      color: "var(--fg-muted)"
    }
  }, subject)), /*#__PURE__*/React.createElement("div", {
    className: "ph-results-top",
    style: {
      display: "grid",
      gridTemplateColumns: "320px 1fr",
      gap: 20,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl-surface",
    style: {
      padding: 24,
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    score: 82
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: "var(--fg-muted)"
    }
  }, scoreLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      color: "var(--fg-strong)",
      lineHeight: 1.2
    }
  }, "Strong"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "var(--fg-muted)",
      lineHeight: 1.5
    }
  }, "Most checks are passing."))), /*#__PURE__*/React.createElement("div", {
    className: "dl-surface",
    style: {
      padding: 24,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, [{
    dot: "success",
    label: "Metric A",
    value: "Passing",
    note: "no issues"
  }, {
    dot: "success",
    label: "Metric B",
    value: "Passing",
    note: "no issues"
  }, {
    dot: "warning",
    label: "Metric C",
    value: "Needs review",
    note: "1 field missing"
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "var(--fg-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-dot dl-dot-" + s.dot
  }), s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 26,
      color: "var(--fg-strong)",
      lineHeight: 1.1
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg-faint)"
    }
  }, s.note))))), /*#__PURE__*/React.createElement("div", {
    className: "dl-alert dl-alert-warning",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "One fix to raise your score."), "\xA0Add the missing field so downstream checks pass \u2014 see ", /*#__PURE__*/React.createElement("code", {
    className: "dl-code-inline"
  }, "metric_c"), " above.")), /*#__PURE__*/React.createElement("div", {
    className: "ph-results-bottom",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Sample payload",
    badge: /*#__PURE__*/React.createElement("span", {
      className: "dl-status dl-status-info"
    }, "application/json")
  }, /*#__PURE__*/React.createElement("pre", {
    className: "dl-code",
    style: {
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "{"), "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"id\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"REC-1042\""), ",", "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"status\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"active\""), ",", "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"type\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"sample\""), ",", "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"owner\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"Acme Co\""), ",", "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"meta\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "{"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"region\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"EU\""), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "}"), "\n", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "}"))), /*#__PURE__*/React.createElement(Panel, {
    title: "Detail table",
    badge: /*#__PURE__*/React.createElement("span", {
      className: "dl-status dl-status-neutral"
    }, "4 rows")
  }, /*#__PURE__*/React.createElement("table", {
    className: "dl-param-table"
  }, /*#__PURE__*/React.createElement("tbody", null, [{
    t: "Category one",
    n: "12 items"
  }, {
    t: "Category two",
    n: "1 item"
  }, {
    t: "Category three",
    n: "1 item"
  }, {
    t: "Category four",
    n: "1 item"
  }].map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.t
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-param-name"
  }, r.t)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 0",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-param-type"
  }, r.n))))))))));
}
Object.assign(window, {
  ResultsPreview,
  ScoreRing
});
Object.assign(__ds_scope, { ResultsPreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product-page/ResultsPreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product-page/primitives.jsx
try { (() => {
// primitives.jsx — Datalab UI kit shared building blocks
// Button (primary/secondary/tertiary), IconWell, Card, Chip, Container, Eyebrow, LearnMore
// Self-contained copy so this kit stays portable to other Datalab projects.

const DL = {
  navy: "#002C47",
  mint: "#52E9C0",
  mint600: "#2FCBA1",
  purple: "#B399FF",
  sky: "#DAE7FE",
  mist: "#F0F4F8",
  slate: "#5C7185",
  white: "#FFFFFF",
  hairline: "#E2E8F0",
  navy700: "#013A5E",
  navy900: "#001E32"
};
function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const sizing = size === "sm" ? {
    fontSize: 14,
    padding: "9px 18px"
  } : {
    fontSize: 15,
    padding: "14px 28px"
  };
  const base = {
    fontFamily: '"PT Sans", sans-serif',
    fontWeight: 700,
    letterSpacing: "0.5px",
    borderRadius: 20,
    ...sizing,
    border: "2px solid transparent",
    cursor: "pointer",
    lineHeight: 1,
    transition: "background 150ms ease-out, transform 120ms ease-out, box-shadow 150ms ease-out, color 150ms",
    transform: down ? "scale(0.97)" : "scale(1)",
    whiteSpace: "nowrap"
  };
  const skin = {
    primary: {
      background: hover ? DL.mint600 : DL.mint,
      color: DL.navy,
      boxShadow: hover ? "0 8px 24px rgba(0,44,71,0.12)" : "none"
    },
    secondary: {
      background: hover ? DL.navy700 : DL.navy,
      color: DL.white
    },
    tertiary: {
      background: hover ? "rgba(0,44,71,0.04)" : "transparent",
      color: DL.navy,
      borderColor: DL.navy
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, children);
}
function IconWell({
  icon,
  tone = "sky",
  size = 48
}) {
  const bg = {
    sky: DL.sky,
    purple: DL.purple,
    mint: DL.mint
  }[tone];
  const iconSize = Math.round(size * 0.5);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: iconSize,
      height: iconSize,
      color: DL.navy,
      strokeWidth: 2
    }
  }));
}
function Card({
  children,
  hover: hoverable = false,
  style = {},
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => hoverable && setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: DL.white,
      borderRadius: 20,
      padding: 24,
      boxShadow: hover ? "0 8px 24px rgba(0,44,71,0.12)" : "0 2px 8px rgba(0,44,71,0.08)",
      transition: "box-shadow 150ms ease-out, transform 150ms ease-out",
      transform: hover ? "translateY(-3px)" : "none",
      cursor: onClick ? "pointer" : "default",
      boxSizing: "border-box",
      ...style
    }
  }, children);
}
function Chip({
  children,
  active = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "8px 18px",
      borderRadius: 20,
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 14,
      color: DL.navy,
      background: active ? DL.mint : DL.sky,
      cursor: "pointer",
      transition: "background 150ms"
    }
  }, children);
}
function Container({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px",
      boxSizing: "border-box",
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: onDark ? DL.mint : DL.slate
    }
  }, children);
}
function LearnMore({
  label = "Learn more",
  onDark = false
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 16,
      color: onDark ? DL.white : DL.navy,
      cursor: "pointer",
      display: "inline-flex",
      gap: 6
    }
  }, label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      transition: "transform 150ms",
      transform: hover ? "translateX(4px)" : "none"
    }
  }, "\u2192"));
}
Object.assign(window, {
  DL,
  Button,
  IconWell,
  Card,
  Chip,
  Container,
  Eyebrow,
  LearnMore
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product-page/primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CTASection.jsx
try { (() => {
// CTASection.jsx — navy call-to-action band + Footer
function CTASection({
  onStart
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: DL.navy,
      padding: "88px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 0,
      top: -30,
      width: 160,
      height: 160,
      background: "rgba(82,233,192,0.18)",
      borderRadius: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 44,
      lineHeight: 1.15,
      letterSpacing: "-0.5px",
      color: DL.white
    }
  }, "Ready to accelerate?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 20,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.78)"
    }
  }, "Tell us where you're headed. We'll show you the fastest data-driven route to get there."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onStart
  }, "Get started")))));
}
function Footer() {
  const cols = {
    "Focus areas": ["Data", "Technology Innovation", "Business Innovation"],
    "Company": ["About", "Careers", "Insights", "Contact"],
    "Legal": ["Privacy", "Terms", "Cookies"]
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: DL.navy900,
      padding: "64px 0 40px"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 40,
      paddingBottom: 40,
      borderBottom: "1px solid rgba(255,255,255,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 280,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/datalab-logo-navy.svg",
    alt: "Datalab",
    style: {
      height: 26,
      filter: "brightness(0) invert(1)",
      alignSelf: "flex-start"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 14,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.6)"
    }
  }, "Disrupt. Innovate. Accelerate.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 64,
      flexWrap: "wrap"
    }
  }, Object.entries(cols).map(([head, items]) => /*#__PURE__*/React.createElement("div", {
    key: head,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 14,
      color: DL.mint,
      letterSpacing: "0.5px"
    }
  }, head), items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 14,
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none"
    }
  }, i)))))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 13,
      color: "rgba(255,255,255,0.45)"
    }
  }, "\xA9 2026 Datalab. All rights reserved.")));
}
Object.assign(window, {
  CTASection,
  Footer
});
Object.assign(__ds_scope, { CTASection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CTASection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactModal.jsx
try { (() => {
// ContactModal.jsx — interactive "Get started" / Contact dialog
function ContactModal({
  open,
  onClose
}) {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (open) setSent(false);
  }, [open]);
  if (!open) return null;
  const field = {
    fontFamily: '"PT Sans", sans-serif',
    fontSize: 16,
    color: DL.navy,
    padding: "12px 16px",
    borderRadius: 8,
    border: `1px solid ${DL.hairline}`,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: DL.white
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,30,50,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: DL.white,
      borderRadius: 20,
      padding: 32,
      width: 460,
      maxWidth: "100%",
      boxShadow: "0 8px 24px rgba(0,44,71,0.12)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: 20,
      right: 20,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: DL.slate
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 22,
      height: 22
    }
  })), !sent ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 28,
      color: DL.navy
    }
  }, "Let's talk"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      color: DL.slate
    }
  }, "Tell us about your project and we'll be in touch within a day."), /*#__PURE__*/React.createElement("input", {
    style: field,
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    style: field,
    type: "email",
    placeholder: "Work email",
    required: true
  }), /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...field,
      minHeight: 90,
      resize: "vertical"
    },
    placeholder: "What are you building?"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    style: {
      width: "100%",
      textAlign: "center"
    }
  }, "Send message")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "flex-start",
      padding: "8px 0"
    }
  }, /*#__PURE__*/React.createElement(IconWell, {
    icon: "check",
    tone: "mint"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 28,
      color: DL.navy
    }
  }, "Message sent"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      color: DL.slate
    }
  }, "Thanks \u2014 a Datalab strategist will reach out shortly."), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    onClick: onClose
  }, "Close"))));
}
Object.assign(window, {
  ContactModal
});
Object.assign(__ds_scope, { ContactModal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/DocsPage.jsx
try { (() => {
// DocsPage.jsx — Developer / API reference surface for the Datalab UI kit.
// Uses the tech_tokens.css component classes; renders dark by default,
// with a scoped [data-theme] wrapper and a toggle. onBack returns to the site.

const NAV = [{
  title: "Getting started",
  items: [{
    label: "Authentication"
  }, {
    label: "Rate limits"
  }, {
    label: "Errors"
  }]
}, {
  title: "Predictions",
  items: [{
    label: "Create prediction",
    method: "post",
    active: true
  }, {
    label: "List predictions",
    method: "get"
  }, {
    label: "Retrieve prediction",
    method: "get"
  }, {
    label: "Cancel prediction",
    method: "delete"
  }]
}, {
  title: "Datasets",
  items: [{
    label: "Upload dataset",
    method: "post"
  }, {
    label: "List datasets",
    method: "get"
  }]
}];
const PARAMS = [{
  name: "model",
  req: true,
  type: "string",
  desc: "The Datalab model to run. See the model catalog for available options."
}, {
  name: "input",
  req: true,
  type: "object",
  desc: "The feature payload to score. Keys must match the model's input schema."
}, {
  name: "webhook_url",
  req: false,
  type: "string",
  desc: "HTTPS endpoint notified when an async prediction completes."
}, {
  name: "priority",
  req: false,
  type: "string",
  desc: "Queue priority: standard or realtime. Defaults to standard."
}, {
  name: "stream",
  req: false,
  type: "boolean",
  desc: "Stream partial results via server-sent events. Defaults to false."
}];
function MethodNav({
  m
}) {
  if (!m) return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      display: "inline-block"
    }
  });
  const map = {
    get: "var(--info-fg)",
    post: "var(--success-fg)",
    put: "var(--warning-fg)",
    delete: "var(--danger-fg)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      fontWeight: 700,
      minWidth: 38,
      color: map[m]
    }
  }, m === "delete" ? "DEL" : m.toUpperCase());
}
function Syntax({
  children
}) {
  return children;
}
function DocsPage({
  onBack
}) {
  const [theme, setTheme] = React.useState("dark");
  const [tab, setTab] = React.useState("cURL");
  const [active, setActive] = React.useState("Create prediction");
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  const sampleByTab = {
    "cURL": /*#__PURE__*/React.createElement("pre", {
      className: "dl-code",
      style: {
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "curl"), " https://api.datalab.io/v1/predictions \\", "\n", "  -H ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"x-api-key: $DATALAB_KEY\""), " \\", "\n", "  -H ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"content-type: application/json\""), " \\", "\n", "  -d ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, `'{"model":"forecast-v3","input":{...}}'`)),
    "Python": /*#__PURE__*/React.createElement("pre", {
      className: "dl-code",
      style: {
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "from"), " datalab ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "import"), " Client", "\n", "\n", "client = Client(api_key=", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"$DATALAB_KEY\""), ")", "\n", "client.predictions.create(", "\n", "    model=", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"forecast-v3\""), ",", "\n", "    input={", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-attribute)"
      }
    }, "\"region\""), ": ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"emea\""), "},", "\n", ")"),
    "TS": /*#__PURE__*/React.createElement("pre", {
      className: "dl-code",
      style: {
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "import"), " { Datalab } ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "from"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"datalab\""), ";", "\n", "\n", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "const"), " dl = ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "new"), " Datalab(process.env.KEY);", "\n", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-keyword)"
      }
    }, "await"), " dl.predictions.create({", "\n", "  model: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"forecast-v3\""), ",", "\n", "  input: { region: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--syntax-string)"
      }
    }, "\"emea\""), " },", "\n", "});")
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": theme,
    style: {
      fontFamily: "var(--font-sans)",
      background: "var(--bg-page-tech)",
      color: "var(--fg-default)",
      minHeight: "100vh",
      transition: "background 200ms, color 200ms"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 24px",
      background: "var(--surface-1)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "transparent",
      border: "none",
      color: "var(--fg-muted)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  }), " Back to site"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 20,
      background: "var(--border)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--fg-strong)",
      letterSpacing: "-0.3px"
    }
  }, "Datalab API"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--fg-muted)"
    }
  }, "v1.0.0")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 13,
      color: "var(--fg-strong)",
      background: "var(--surface-2)",
      border: "1px solid var(--border)",
      borderRadius: 999,
      padding: "6px 14px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": theme === "dark" ? "sun" : "moon",
    style: {
      width: 15,
      height: 15
    }
  }), theme === "dark" ? "Light" : "Dark")), /*#__PURE__*/React.createElement("div", {
    className: "dl-docs-layout",
    style: {
      display: "grid",
      gridTemplateColumns: "240px 1fr 360px",
      maxWidth: 1400,
      margin: "0 auto",
      minHeight: "calc(100vh - 53px)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    className: "dl-docs-aside",
    style: {
      borderRight: "1px solid var(--border)",
      padding: "24px 16px"
    }
  }, NAV.map(group => /*#__PURE__*/React.createElement("div", {
    key: group.title,
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: "var(--fg-muted)",
      padding: "0 12px",
      margin: "0 0 8px"
    }
  }, group.title), group.items.map(it => {
    const isActive = it.label === active;
    return /*#__PURE__*/React.createElement("div", {
      key: it.label,
      onClick: () => setActive(it.label),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 12px",
        borderRadius: 6,
        fontSize: 13,
        cursor: "pointer",
        background: isActive ? "var(--surface-2)" : "transparent",
        color: isActive ? "var(--fg-strong)" : "var(--fg-default)",
        fontWeight: isActive ? 700 : 400
      }
    }, /*#__PURE__*/React.createElement(MethodNav, {
      m: it.method
    }), it.label);
  })))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "32px 40px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--fg-muted)",
      marginBottom: 12,
      fontFamily: "var(--font-mono)"
    }
  }, "Predictions ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-faint)",
      margin: "0 8px"
    }
  }, "/"), " Create prediction"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      flexWrap: "wrap",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-method dl-method-post"
  }, "POST"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 18,
      fontWeight: 700,
      color: "var(--fg-strong)"
    }
  }, "/v1/predictions")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 32,
      color: "var(--fg-strong)",
      margin: "16px 0 8px",
      letterSpacing: "-0.5px"
    }
  }, "Create a prediction"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: "var(--fg-muted)",
      maxWidth: 720,
      margin: 0
    }
  }, "Submit a feature payload to a deployed Datalab model and receive a scored prediction. Supports synchronous responses, streaming, and async delivery via webhook."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      margin: "16px 0 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-status dl-status-info"
  }, "Requires authentication"), /*#__PURE__*/React.createElement("span", {
    className: "dl-status dl-status-success"
  }, "Stable since v1"), /*#__PURE__*/React.createElement("span", {
    className: "dl-status dl-status-neutral"
  }, "Idempotent: no")), /*#__PURE__*/React.createElement("div", {
    className: "dl-alert dl-alert-info",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Realtime priority."), "\xA0Set ", /*#__PURE__*/React.createElement("code", {
    className: "dl-code-inline"
  }, "priority: realtime"), " for sub-100ms scoring on supported models.")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      color: "var(--fg-strong)",
      margin: "40px 0 16px",
      letterSpacing: "-0.2px"
    }
  }, "Request body"), /*#__PURE__*/React.createElement("table", {
    className: "dl-param-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: "26%"
    }
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: "18%"
    }
  }, "Type"), /*#__PURE__*/React.createElement("th", null, "Description"))), /*#__PURE__*/React.createElement("tbody", null, PARAMS.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.name
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "dl-param-name"
  }, p.name, p.req && /*#__PURE__*/React.createElement("span", {
    className: "dl-param-required"
  }, "*"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "dl-param-type"
  }, p.type)), /*#__PURE__*/React.createElement("td", null, p.desc))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--fg-faint)",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--danger)",
      fontWeight: 700
    }
  }, "*"), " Required field"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      color: "var(--fg-strong)",
      margin: "40px 0 16px",
      letterSpacing: "-0.2px"
    }
  }, "Responses"), [{
    code: "200",
    tone: "success",
    desc: "Prediction created — scored result returned"
  }, {
    code: "400",
    tone: "warning",
    desc: "Invalid request — payload does not match the model schema"
  }, {
    code: "401",
    tone: "danger",
    desc: "Authentication error — missing or invalid API key"
  }, {
    code: "429",
    tone: "danger",
    desc: "Rate limit exceeded — back off and retry"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.code,
    style: {
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      marginBottom: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      background: "var(--surface-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-method",
    style: {
      background: `var(--${r.tone}-bg)`,
      color: `var(--${r.tone}-fg)`
    }
  }, r.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--fg-muted)"
    }
  }, r.desc), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      background: "var(--surface-2)",
      border: "1px solid var(--border)",
      color: "var(--fg-muted)",
      padding: "2px 8px",
      borderRadius: 4
    }
  }, "application/json"))))), /*#__PURE__*/React.createElement("aside", {
    className: "dl-docs-samples",
    style: {
      borderLeft: "1px solid var(--border)",
      background: "var(--surface-2)",
      padding: "24px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl-tabs",
    style: {
      marginBottom: 12
    }
  }, ["cURL", "Python", "TS"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "dl-tab",
    "aria-selected": tab === t,
    onClick: () => setTab(t)
  }, t))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: "var(--fg-muted)",
      margin: "0 0 8px"
    }
  }, "Request"), sampleByTab[tab], /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: "var(--fg-muted)",
      margin: "24px 0 8px"
    }
  }, "Response"), /*#__PURE__*/React.createElement("pre", {
    className: "dl-code",
    style: {
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "{"), "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"id\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"pred_8Kd02\u2026\""), ",", "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"status\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-string)"
    }
  }, "\"succeeded\""), ",", "\n", "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"output\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "{"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-attribute)"
    }
  }, "\"score\""), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-number)"
    }
  }, "0.92"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "}"), "\n", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--syntax-punctuation)"
    }
  }, "}")))));
}
Object.assign(window, {
  DocsPage
});
Object.assign(__ds_scope, { DocsPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/DocsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FocusAreas.jsx
try { (() => {
// FocusAreas.jsx — the 3-card focus-area grid (Data / Technology / Business)
const FOCUS = [{
  key: "Data",
  tone: "sky",
  icon: "database",
  title: "Data",
  body: "Data science, analytics, engineering and predictive AI.",
  tags: ["Data science", "Analytics", "Data engineering", "Predictive AI"]
}, {
  key: "Technology",
  tone: "purple",
  icon: "cpu",
  title: "Technology Innovation",
  body: "Technology innovation, Generative AI & AI agents, Web development, UX & UI.",
  tags: ["Generative AI", "AI agents", "Web development", "UX & UI"]
}, {
  key: "Business",
  tone: "sky",
  icon: "trending-up",
  title: "Business Innovation",
  body: "Customer experience, AI Maturity scan, Agentic Commerce, Strategy and Digital workforce.",
  tags: ["Customer experience", "AI Maturity scan", "Agentic Commerce", "Digital workforce"]
}];
function FocusCard({
  item,
  expanded,
  onToggle
}) {
  return /*#__PURE__*/React.createElement(Card, {
    hover: true,
    onClick: onToggle,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      minHeight: 258
    }
  }, /*#__PURE__*/React.createElement(IconWell, {
    icon: item.icon,
    tone: item.tone
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 1.3,
      color: DL.navy
    }
  }, item.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      color: DL.slate,
      flex: 1
    }
  }, item.body), expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      paddingTop: 4
    }
  }, item.tags.map(t => /*#__PURE__*/React.createElement(Chip, {
    key: t
  }, t))), /*#__PURE__*/React.createElement(LearnMore, {
    label: expanded ? "Show less" : "Learn more"
  }));
}
function FocusAreas() {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: DL.white,
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 40,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What we do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
      color: DL.navy
    }
  }, "Three ways we accelerate you")), /*#__PURE__*/React.createElement("div", {
    className: "dl-grid-3",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, FOCUS.map(item => /*#__PURE__*/React.createElement(FocusCard, {
    key: item.key,
    item: item,
    expanded: open === item.key,
    onToggle: () => setOpen(open === item.key ? null : item.key)
  })))));
}
Object.assign(window, {
  FocusAreas
});
Object.assign(__ds_scope, { FocusAreas });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FocusAreas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Header.jsx — sticky top navigation
function Header({
  onContact,
  onStart,
  onDocs
}) {
  const [open, setOpen] = React.useState(false);
  const links = ["Data", "Technology", "Business", "Developers", "Insights"];
  const handleNav = (e, l) => {
    e.preventDefault();
    if (l === "Developers" && onDocs) onDocs();
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${DL.hairline}`
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 76
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/datalab-logo-navy.svg",
    alt: "Datalab",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    },
    className: "dl-desktop-nav"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => handleNav(e, l),
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      fontWeight: 400,
      color: DL.navy,
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    },
    className: "dl-desktop-nav"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "sm",
    onClick: onContact
  }, "Contact"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onStart
  }, "Get started")), /*#__PURE__*/React.createElement("button", {
    className: "dl-mobile-toggle",
    onClick: () => setOpen(!open),
    "aria-label": "Menu",
    style: {
      display: "none",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: DL.navy
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": open ? "x" : "menu",
    style: {
      width: 28,
      height: 28
    }
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${DL.hairline}`,
      background: DL.white,
      padding: "16px 32px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginBottom: 20
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      handleNav(e, l);
      setOpen(false);
    },
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 18,
      color: DL.navy,
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    onClick: onContact
  }, "Contact"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onStart
  }, "Get started"))));
}
Object.assign(window, {
  Header
});
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero.jsx — headline + CTA with decorative square motif
function Hero({
  onStart
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: DL.white
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: -60,
      right: -40,
      display: "flex",
      gap: 16,
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 160,
      background: DL.sky,
      borderRadius: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 160,
      background: DL.mist,
      borderRadius: 20,
      marginTop: 80
    }
  })), /*#__PURE__*/React.createElement(Container, {
    style: {
      position: "relative",
      padding: "96px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Data & AI consultancy"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 1.1,
      letterSpacing: "-0.5px",
      color: DL.navy
    }
  }, "Disrupt. Innovate.", /*#__PURE__*/React.createElement("br", null), "Accelerate."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 20,
      lineHeight: 1.6,
      color: DL.slate,
      maxWidth: 560
    }
  }, "We turn data into momentum \u2014 building the platforms, AI agents and strategies that move your business faster than the market."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onStart
  }, "Get started"), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary"
  }, "See our work")))));
}
Object.assign(window, {
  Hero
});
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StatBand.jsx
try { (() => {
// StatBand.jsx — metric/stat cards on a mist band
const STATS = [{
  fig: "5×",
  cap: "faster insights delivery",
  label: "Data Platforms"
}, {
  fig: "40%",
  cap: "lower operating cost",
  label: "AI Automation"
}, {
  fig: "12wk",
  cap: "to production-ready agents",
  label: "Generative AI"
}];
function StatCard({
  s
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: "hidden",
      paddingBottom: 22,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 120,
      background: DL.mist
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 24px 0",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 44,
      letterSpacing: "-0.5px",
      lineHeight: 1.1,
      color: DL.navy
    }
  }, s.fig), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 14,
      color: DL.slate
    }
  }, s.cap), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: 16,
      fontWeight: 700,
      color: DL.navy,
      marginTop: 6
    }
  }, s.label)));
}
function StatBand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: DL.mist,
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 40,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Proof, not promises"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: '"PT Serif", serif',
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
      color: DL.navy
    }
  }, "Outcomes our clients measure")), /*#__PURE__*/React.createElement("div", {
    className: "dl-grid-3",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, STATS.map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s.label,
    s: s
  })))));
}
Object.assign(window, {
  StatBand
});
Object.assign(__ds_scope, { StatBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StatBand.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/primitives.jsx
try { (() => {
// Primitives.jsx — Datalab UI kit shared building blocks
// Button (primary/secondary/tertiary pills), IconWell, Card, Chip, Container, Eyebrow

const DL = {
  navy: "#002C47",
  mint: "#52E9C0",
  mint600: "#2FCBA1",
  purple: "#B399FF",
  sky: "#DAE7FE",
  mist: "#F0F4F8",
  slate: "#5C7185",
  white: "#FFFFFF",
  hairline: "#E2E8F0",
  navy700: "#013A5E",
  navy900: "#001E32"
};
function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const sizing = size === "sm" ? {
    fontSize: 14,
    padding: "9px 18px"
  } : {
    fontSize: 15,
    padding: "14px 28px"
  };
  const base = {
    fontFamily: '"PT Sans", sans-serif',
    fontWeight: 700,
    letterSpacing: "0.5px",
    borderRadius: 20,
    ...sizing,
    border: "2px solid transparent",
    cursor: "pointer",
    lineHeight: 1,
    transition: "background 150ms ease-out, transform 120ms ease-out, box-shadow 150ms ease-out, color 150ms",
    transform: down ? "scale(0.97)" : "scale(1)",
    whiteSpace: "nowrap"
  };
  const skin = {
    primary: {
      background: hover ? DL.mint600 : DL.mint,
      color: DL.navy,
      boxShadow: hover ? "0 8px 24px rgba(0,44,71,0.12)" : "none"
    },
    secondary: {
      background: hover ? DL.navy700 : DL.navy,
      color: DL.white
    },
    tertiary: {
      background: hover ? "rgba(0,44,71,0.04)" : "transparent",
      color: DL.navy,
      borderColor: DL.navy
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, children);
}
function IconWell({
  icon,
  tone = "sky",
  size = 48
}) {
  const bg = {
    sky: DL.sky,
    purple: DL.purple,
    mint: DL.mint
  }[tone];
  const iconSize = Math.round(size * 0.5);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: iconSize,
      height: iconSize,
      color: DL.navy,
      strokeWidth: 2
    }
  }));
}
function Card({
  children,
  hover: hoverable = false,
  style = {},
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => hoverable && setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: DL.white,
      borderRadius: 20,
      padding: 24,
      boxShadow: hover ? "0 8px 24px rgba(0,44,71,0.12)" : "0 2px 8px rgba(0,44,71,0.08)",
      transition: "box-shadow 150ms ease-out, transform 150ms ease-out",
      transform: hover ? "translateY(-3px)" : "none",
      cursor: onClick ? "pointer" : "default",
      boxSizing: "border-box",
      ...style
    }
  }, children);
}
function Chip({
  children,
  active = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "8px 18px",
      borderRadius: 999,
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 14,
      color: DL.navy,
      background: active ? DL.mint : DL.sky,
      cursor: "pointer",
      transition: "background 150ms"
    }
  }, children);
}
function Container({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px",
      boxSizing: "border-box",
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: onDark ? DL.mint : DL.slate
    }
  }, children);
}
function LearnMore({
  label = "Learn more",
  onDark = false
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: 16,
      color: onDark ? DL.white : DL.navy,
      cursor: "pointer",
      display: "inline-flex",
      gap: 6
    }
  }, label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      transition: "transform 150ms",
      transform: hover ? "translateX(4px)" : "none"
    }
  }, "\u2192"));
}
Object.assign(window, {
  DL,
  Button,
  IconWell,
  Card,
  Chip,
  Container,
  Eyebrow,
  LearnMore
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/primitives.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.AlertBanner = __ds_scope.AlertBanner;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ModalDialog = __ds_scope.ModalDialog;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.SliderInput = __ds_scope.SliderInput;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Stack = __ds_scope.Stack;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.MenuDropdown = __ds_scope.MenuDropdown;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ProductHero = __ds_scope.ProductHero;

__ds_ns.ResultsPreview = __ds_scope.ResultsPreview;

__ds_ns.CTASection = __ds_scope.CTASection;

__ds_ns.ContactModal = __ds_scope.ContactModal;

__ds_ns.DocsPage = __ds_scope.DocsPage;

__ds_ns.FocusAreas = __ds_scope.FocusAreas;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.StatBand = __ds_scope.StatBand;

})();

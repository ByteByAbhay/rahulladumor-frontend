// src/common/RenderHTML.jsx
import React from "react";
import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";

/**
 * Common RenderHTML utility
 *
 * ✅ Safely renders HTML with full class/style support
 * ✅ Handles both class and className
 * ✅ Can inject custom replacements or content transforms
 * ✅ Ready for future dynamic updates
 */
export default function RenderHTML({
  htmlString = "",
  sanitize = true,
  enforceClasses = {},
  customTransforms = {}, // allows future dynamic content replacements
}) {
  // Optionally sanitize HTML
  const safeHtml = sanitize ? DOMPurify.sanitize(htmlString) : htmlString;

  const options = {
    replace: (domNode) => {
      if (!domNode || domNode.type !== "tag") return;

      // normalize className -> class
      if (domNode.attribs?.className && !domNode.attribs?.class) {
        domNode.attribs.class = domNode.attribs.className;
      }

      const nodeName = domNode.name;
      const existingClass = domNode.attribs?.class || "";
      const enforcedClass = enforceClasses[nodeName] || "";
      const finalClassName = `${existingClass} ${enforcedClass}`.trim();

      // 🧩 Custom transforms — for future content modifications
      // Example: replace <span class="text-accent"> with another element
      if (customTransforms[nodeName]) {
        return customTransforms[nodeName](domNode, domToReact, options);
      }

      // Default handling for known tags
      switch (nodeName) {
        case "h1":
          return (
            <h1 className={finalClassName}>
              {domToReact(domNode.children, options)}
            </h1>
          );
        case "span":
          return (
            <span className={finalClassName}>
              {domToReact(domNode.children, options)}
            </span>
          );
        case "p":
          return (
            <p className={finalClassName}>
              {domToReact(domNode.children, options)}
            </p>
          );
        default:
          return undefined; // fallback to normal parse behavior
      }
    },
  };

  return <>{parse(safeHtml, options)}</>;
}

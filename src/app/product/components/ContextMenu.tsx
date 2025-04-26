"use client";
import React, { useLayoutEffect, useRef, useState } from "react";

type ContextMenuItem = {
  text: string;
  data: React.ReactNode;
  id: string; // <-- add a unique id
};

type ContextMenuProps = {
  minHeight?: number;
  maxHeight?: number;
  menuList: ContextMenuItem[];
};

export function ContextMenu({
  menuList,
  minHeight = 100, // <-- sensible defaults
  maxHeight = 300
}: ContextMenuProps) {
  const [selectedMenu, setSelectedMenu] = useState(menuList[0]);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  // Track whether the *collapsed* content is actually truncated.
  const [isTruncated, setIsTruncated] = useState(false);

  // Recompute on tab switch (and when heights change)
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // Is the full content taller than our collapsed height?
    setIsTruncated(el.scrollHeight > minHeight);
    // scroll back to top on tab change
    el.scrollTop = 0;
  }, [selectedMenu, minHeight]);

  // Is this tab “open”?
  const isOpen = openStates[selectedMenu.id] === true;

  const toggleOpen = () => {
    setOpenStates((prev) => ({
      ...prev,
      [selectedMenu.id]: !prev[selectedMenu.id]
    }));
  };

  return (
    <div className="h-auto">
      {/* Tabs */}
      <div className="flex w-full border-b-2 border-gray-100 gap-5">
        {menuList.map((item) => {
          const isSelected = selectedMenu.id === item.id;
          return (
            <button
              key={item.id}
              className={`px-2 py-1 font-medium ${
                isSelected ? "border-b-2 border-gray-600" : "text-gray-600"
              }`}
              onClick={() => setSelectedMenu(item)}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {/* Content box */}
      <div
        ref={contentRef}
        className={`
          mt-4 w-full
          ${isOpen ? "overflow-y-auto" : "overflow-hidden"}
          ${!isOpen ? "line-clamp-3" : ""}     /* multiline clamp */
        `}
        style={{
          maxHeight: isOpen ? maxHeight : minHeight
        }}
      >
        {selectedMenu.data}
      </div>

      {/* “View more/less” */}
      {isTruncated && (
        <button
          className="mt-2 font-bold underline-offset-4 underline"
          onClick={toggleOpen}
        >
          {isOpen ? "VIEW LESS" : "VIEW MORE"}
        </button>
      )}
    </div>
  );
}

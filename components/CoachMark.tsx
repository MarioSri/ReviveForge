"use client";
import { Fragment, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCoachMarks } from "@/hooks/useCoachMarks";

interface CoachMarkProps {
  id: string;
  targetRef: React.RefObject<HTMLElement>;
  title: string;
  body: string;
}

export default function CoachMark({ id, targetRef, title, body }: CoachMarkProps) {
  const { dismissCurrent, isDismissed, current } = useCoachMarks();
  const popoverRef = useRef<HTMLDivElement>(null);

  // Position popover near target
  useEffect(() => {
    if (!targetRef.current || !popoverRef.current) return;
    const targetRect = targetRef.current.getBoundingClientRect();
    const popover = popoverRef.current;
    popover.style.top = `${targetRect.bottom + window.scrollY + 8}px`;
    popover.style.left = `${targetRect.left + window.scrollX}px`;
  }, [targetRef, current]);

  if (isDismissed(id) || current !== id) return null;

  return (
    <Popover as="div" className="absolute z-50" ref={popoverRef} static>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <Popover.Panel
          role="dialog"
          aria-modal="true"
          className="bg-white text-gray-900 rounded-lg shadow-lg p-4 w-72 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-base">{title}</h3>
            <button
              aria-label="Dismiss coach mark"
              onClick={dismissCurrent}
              className="ml-2 p-1 rounded hover:bg-gray-100 focus:outline-none"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm mb-2">{body}</div>
          <div className="w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 absolute -top-2 left-8" aria-hidden="true" />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

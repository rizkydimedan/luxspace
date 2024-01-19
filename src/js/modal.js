import {
    addClass,
    removeClass
} from "./utils-class";

const modalTriggers = document.getElementsByClassName("modal-trigger");
const modalWrapperClassNames = "fixed inset-0 bg-black opacity-35";
for (let index = 0; index < modalTriggers.length; index++) {
    const e = modalTriggers[index];

    e.addEventListener("click", function () {

        // Create modal wrapper and overlay
        const modalWrapper = document.createElement("div");
        const modalOverlay = document.createElement("div");

        // Add click event listener to close modal
        modalOverlay.addEventListener("click", function () {
            modalWrapper.remove();
        });

        // Style modal wrapper
        addClass(modalWrapper, "fixed inset-0 z-40 flex items-center justify-center w-200 min-h-screen");

        // Style modal overlay with given class names
        addClass(modalOverlay, modalWrapperClassNames);

        // Create modal content
        const modalContent = document.createElement("div");
        modalContent.innerHTML = e.attributes?.["data-content"].value;

        // Append modal overlay and content to modal wrapper
        addClass(modalContent, "bg-white p-0 md:p-6 z-10");
        modalWrapper.append(modalOverlay);
        modalWrapper.append(modalContent);

        // Append modal wrapper to document body
        document.body.append(modalWrapper);
    });
}
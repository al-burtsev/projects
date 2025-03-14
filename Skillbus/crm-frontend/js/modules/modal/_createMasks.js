import { setMask } from "../functions/_setMask.js";

export function createMasks(elem, value) {
    switch (value) {
        case "Телефон":
            setMask(elem, {
                mask: "+7 (999) 999-99-99",
                placeholder: "_",
                showMaskOnHover: true,
                showMaskOnFocus: true,
                clearIncomplete: true
            });
            break
        case "Email":
            setMask(elem, {
                "alias": "email",
                showMaskOnHover: true,
                showMaskOnFocus: true,
                clearIncomplete: true,
            });
            break

        case "Facebook":
        case "VK":
        default:
            setMask(elem, {
                mask: "*{3,30}",
                placeholder: "",
                onBeforePaste: function (pastedValue) {
                    return pastedValue;
                },
                definitions: {
                    '*': {
                        validator: "[A-Za-z0-9./@_-]",
                        cardinality: 1
                    }
                }
            });
            break
    }
}
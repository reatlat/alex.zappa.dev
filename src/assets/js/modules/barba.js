import barba from "@barba/core";
import gsap from "gsap";

barba.init({
    transitions: [
        {
            name: "opacity-transition",
            leave(data) {
                // scroll page to top
                window.scrollTo(0, 0);
                return gsap.to(data.current.container, {
                    opacity: 0,
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0,
                });
            },
        },
    ],
});

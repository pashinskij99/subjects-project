import gsap from 'gsap';

export let isMobile = window.innerWidth <= 480;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 480;
});

export const rotateObjects = (
    scene,
    modelPosition,
    scrollModifier,
    rotationModifier,
    slideIndex
) => {
    scene.traverse((object) => {
        if (object.isMesh) {
            gsap.to(object.rotation, {
                x:
                    modelPosition[0] +
                    (scrollModifier - slideIndex) * rotationModifier.x,
            });
            gsap.to(object.rotation, {
                y:
                    modelPosition[1] +
                    (scrollModifier - slideIndex) * rotationModifier.y,
            });
            gsap.to(object.rotation, {
                z:
                    modelPosition[2] +
                    (scrollModifier - slideIndex) * rotationModifier.z,
            });
        }
    });
};

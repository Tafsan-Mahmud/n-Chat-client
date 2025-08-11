import React, { useRef, useEffect } from 'react';
import { demoUsers } from '../demoUser';
import Image from 'next/image';

const ActiveUsers = () => {
    const scrollContainerRef = useRef(null);
    const scrollVelocityRef = useRef(0); // Tracks scroll speed for animation
    const animationFrameRef = useRef(null); // ID for the animation loop

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        // The core animation loop for smooth scrolling
        const animateScroll = () => {
            if (Math.abs(scrollVelocityRef.current) < 0.5) {
                // Stop the animation when velocity is low
                scrollVelocityRef.current = 0;
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
                return;
            }

            // Apply the velocity and scroll
            scrollContainer.scrollLeft += scrollVelocityRef.current;
            // Apply friction to slow down the scroll
            scrollVelocityRef.current *= 0.88;
            animationFrameRef.current = requestAnimationFrame(animateScroll);
        };

        // --- Mouse Drag Logic ---
        const handleMouseDown = (e) => {
            e.preventDefault();
            isDown = true;
            scrollContainer.classList.add('active-dragging');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;

            // Stop any ongoing animation when a drag starts
            scrollVelocityRef.current = 0;
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };

        const handleMouseLeave = () => {
            isDown = false;
            scrollContainer.classList.remove('active-dragging');
        };

        const handleMouseUp = () => {
            isDown = false;
            scrollContainer.classList.remove('active-dragging');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            // Adjust the drag speed multiplier
            const walk = (x - startX) * 0.6;
            scrollContainer.scrollLeft = scrollLeft - walk;
        };

        // --- Mouse Wheel Logic ---
        const handleWheel = (e) => {
            e.preventDefault();

            // Dampen the wheel's impact and add it to the velocity
            const wheelSpeed = e.deltaY * 0.2; // Reduced speed to prevent fast jumping

            // Queue up the scroll amount
            scrollVelocityRef.current += wheelSpeed;

            // Start animation loop if it's not already running
            if (!animationFrameRef.current) {
                animationFrameRef.current = requestAnimationFrame(animateScroll);
            }
        };

        // Attach event listeners
        scrollContainer.addEventListener('mousedown', handleMouseDown);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);
        scrollContainer.addEventListener('mouseup', handleMouseUp);
        scrollContainer.addEventListener('mousemove', handleMouseMove);
        scrollContainer.addEventListener('wheel', handleWheel);

        // Cleanup
        return () => {
            scrollContainer.removeEventListener('mousedown', handleMouseDown);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            scrollContainer.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('mousemove', handleMouseMove);
            scrollContainer.removeEventListener('wheel', handleWheel);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div className='pb-2'>
            {/* <p className='text-xl font-semibold text-slate-600 mt-3 w-30'>Active Users.</p> */}
            <div
                ref={scrollContainerRef}
                className='flex items-center gap-5 custom-scrollbar-activeuser overflow-x-scroll whitespace-nowrap mt-5 cursor-grab active:cursor-grabbing select-none px-8'
            >
                {
                    demoUsers.map((user, i) => (
                        <div key={i} className='inline-block'>
                            <div className='w-14 h-14 flex justify-center items-center relative'>
                                <Image
                                    alt='author image'
                                    width={55}
                                    height={55}
                                    className='rounded-full'
                                    src={user.image_uri}
                                />
                                <div className='absolute right-0 bottom-0 w-4 h-4 bg-slate-100 rounded-full flex justify-center items-center'>
                                    <div className='w-3 h-3 bg-green-500 rounded-full'>
                                    </div>
                                </div>
                            </div>
                            <span className='text-sm text-slate-600'>{user.name.slice(0, 8) + '..'}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ActiveUsers;
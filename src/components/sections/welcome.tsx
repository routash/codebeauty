"use client";
export function Welcome() {
    return (
        <section
            className="pt-0  "
            aria-label="Hero section"
        >
            <div className="min-h-screen  flex items-center justify-center px-4 ">
                <div className="w-full">
                    <h1 className="mb-6  text-6xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-bold text-center">Welcome to our website</h1>
                    <p className="mb-4 text-center text-gray-600 text-2xl">Learn coding through beautiful, modern tutorials designed for beginners and professionals</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                            Start Learning Now
                        </button>
                        <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl border-2 border-purple-200 hover:bg-purple-50 transition-all duration-300">
                            View Courses
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
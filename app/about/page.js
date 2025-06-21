export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br  from-white to-gray-100 text-gray-800 px-4 sm:px-8 pt-20 py-12">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">About Us</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-10">
                    Welcome to <span className="font-semibold text-blue-600">Anandam Wellness</span> – your trusted partner in skincare and wellness.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-3">Our Vision</h2>
                    <p className="text-sm sm:text-base text-gray-700">
                        To create a digital bridge between patients and experienced dermatologists, offering expert consultations from the comfort of your home.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-3">Our Mission</h2>
                    <p className="text-sm sm:text-base text-gray-700">
                        We aim to make skin and hair care accessible, affordable, and reliable for everyone by leveraging technology and certified medical professionals.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">Why Choose Us?</h2>
                <ul className="text-gray-700 text-sm sm:text-base space-y-3 text-left list-disc list-inside">
                    <li>Expert certified dermatologists</li>
                    <li>Private & secure real-time chat & video consultation</li>
                    <li>Digital prescriptions</li>
                    <li>Easy appointment booking & smooth payment process</li>
                </ul>
            </div>

            {/* Optional: Team section */}
            {/* <div className="mt-16">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-6">Meet the Team</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="text-center">
                        <img src="/team1.jpg" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
                        <p className="font-semibold">Dr. Priya Sharma</p>
                        <p className="text-sm text-gray-500">Lead Dermatologist</p>
                    </div>
                    <div className="text-center">
                        <img src="/team2.jpg" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
                        <p className="font-semibold">Krishna Gupta</p>
                        <p className="text-sm text-gray-500">Full-Stack Developer</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

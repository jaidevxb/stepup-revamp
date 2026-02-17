export default function MarketReality() {
  const stats = [
    { value: '1.5M+', label: 'Open Tech Roles', sublabel: 'in India alone' },
    { value: '72%', label: 'Startups Struggle', sublabel: 'to find talent' },
    { value: '₹8-15L', label: 'Starting Salary', sublabel: 'for product devs' },
    { value: '3x', label: 'Faster Growth', sublabel: 'vs traditional roles' },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The Market Reality</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            There is no shortage of jobs. There is a shortage of people with the right combination
            of skills. Companies — especially startups — are desperate for developers who can think
            beyond code: who understand the user, the product, and the business.{' '}
            <span className="font-semibold text-gray-900">That's a Product Developer.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

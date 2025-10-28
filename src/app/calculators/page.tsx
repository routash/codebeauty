"use client"
import { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CalculatorsPage() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState(null);

  const calculators = [
    { id: 'cd', name: "CD Calculator" },
    { id: 'compound', name: "Compound Interest Calculator" },
    { id: 'cagr', name: "CAGR Calculator" },
    { id: 'appreciation', name: "Appreciation Calculator" },
    { id: 'apy', name: "APY Calculator" },
    { id: 'breakeven', name: "Break-Even Calculator" },
    { id: 'capm', name: "CAPM Calculator" },
    { id: 'coe', name: "Cost Of Equity Calculator" },
    { id: 'currentratio', name: "Current Ratio Calculator" },
    { id: 'depreciation', name: "Depreciation Calculator" },
    { id: 'dividend', name: "Dividend Calculator" },
    { id: 'dcf', name: "DCF Calculator" },
    { id: 'ddm', name: "DDM Calculator" },
    { id: 'eps', name: "Earnings Per Share Calculator" },
    { id: 'ebit', name: "EBIT Calculator" },
    { id: 'ebitda', name: "EBITDA Calculator" },
    { id: 'ebitdamultiple', name: "EBITDA Multiple Calculator" },
    { id: 'ev', name: "Enterprise Value Calculator" },
    { id: 'fcf', name: "FCF Calculator" },
    { id: 'futurevalue', name: "Future Value Calculator" },
    { id: 'inventory', name: "Inventory Turnover Calculator" },
    { id: 'interestcoverage', name: "Interest Coverage Ratio Calculator" },
    { id: 'marginalcost', name: "Marginal Cost Calculator" },
    { id: 'marketcap', name: "Market Capitalization Calculator" },
    { id: 'npm', name: "Net Profit Margin Calculator" },
    { id: 'cashflowdebt', name: "Cash Flow to Debt Ratio Calculator" },
    { id: 'eva', name: "Economic Value Added Calculator" },
    { id: 'dol', name: "Degree of Operating Leverage Calculator" },
    { id: 'cir', name: "Compound Interest Rate Calculator" },
    { id: 'equivalent', name: "Equivalent Rate Calculator" },
    { id: 'fd', name: "FD Calculator" },
    { id: 'ppf', name: "PPF Calculator" },
    { id: 'wacc', name: "WACC Calculator" },
    { id: 'nopat', name: "NOPAT Calculator" },
    { id: 'ear', name: "EAR Calculator" },
    { id: 'perpetuity', name: "Perpetuity Calculator" }
  ];

  const handleCalculatorClick = (calc) => {
    setSelectedCalculator(calc);
    setIsSliderOpen(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Calculators</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCalculator ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Calculators</h2>
              <p className="text-lg text-gray-600 mb-8">
                Powerful tools for all your financial calculations
              </p>
              <button
                onClick={() => setIsSliderOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mx-auto"
              >
                Open Calculators
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">35+ Calculators</h3>
                <p className="text-gray-600">Access a wide range of financial calculators for all your needs</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
                <p className="text-gray-600">Simple and intuitive interface for quick calculations</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Results</h3>
                <p className="text-gray-600">Precise calculations for reliable financial planning</p>
              </div>
            </div>
          </>
        ) : (
          <CalculatorContent 
            calculator={selectedCalculator} 
            onBack={() => setSelectedCalculator(null)}
          />
        )}
      </div>

      {isSliderOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSliderOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSliderOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Calculators</h2>
          <button
            onClick={() => setIsSliderOpen(false)}
            className="p-2 hover:bg-purple-500 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-[calc(100%-80px)] overflow-y-auto p-4">
          <div className="grid gap-3">
            {calculators.map((calc, index) => (
              <button
                key={index}
                onClick={() => handleCalculatorClick(calc)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-purple-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium group-hover:text-purple-700">
                    {calc.name}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function CalculatorContent({ calculator, onBack }) {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(10);
  const [timeUnit, setTimeUnit] = useState('Years');
  const [currency, setCurrency] = useState('$');
  const [frequency, setFrequency] = useState('Yearly');
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  const frequencyMap = {
    'Yearly': 1,
    'Semi-Annually': 2,
    'Quarterly': 4,
    'Monthly': 12,
    'Daily': 365
  };

  const calculateCD = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    let t = parseFloat(time);
    
    // Convert months to years if needed
    if (timeUnit === 'Months') {
      t = t / 12;
    }
    
    const n = frequencyMap[frequency];

    const amount = p * Math.pow((1 + r/n), n*t);
    const interest = amount - p;

    setResult({
      totalAmount: amount,
      interest: interest
    });

    // Generate chart data
    const data = [];
    const totalYears = Math.ceil(t);
    const step = totalYears > 20 ? Math.ceil(totalYears / 20) : 1;
    
    for (let year = 0; year <= totalYears; year += step) {
      const yearAmount = p * Math.pow((1 + r/n), n*year);
      data.push({
        year: year + 'yr',
        'Initial Amount': p,
        'Total Amount': yearAmount
      });
    }
    setChartData(data);
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';
    
    const convert = (n) => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convert(n % 100) : '');
      if (n < 1000000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
      if (n < 1000000000) return convert(Math.floor(n / 1000000)) + ' Million' + (n % 1000000 !== 0 ? ' ' + convert(n % 1000000) : '');
      return '';
    };

    const currencyName = currency === '₹' ? 'Rupees' : currency === '€' ? 'Euros' : currency === '£' ? 'Pounds' : 'Dollars';
    return convert(Math.floor(num)) + ' ' + currencyName;
  };

  if (calculator.id !== 'cd') {
    return (
      <div>
        <button onClick={onBack} className="mb-6 text-purple-600 hover:text-purple-700 font-medium">
          ← Back to Calculators
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{calculator.name}</h2>
          <p className="text-gray-600">This calculator is coming soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-purple-600 hover:text-purple-700 font-medium">
        ← Back to Calculators
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Inputs */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">CD Calculator</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Initial Deposit
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-4 py-3 pr-20 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="text-gray-600 font-medium bg-transparent border-none focus:outline-none cursor-pointer pr-6 appearance-none"
                  >
                    <option value="$">$</option>
                    <option value="₹">₹</option>
                    <option value="€">€</option>
                    <option value="£">£</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-purple-600 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 font-bold text-lg">%</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Tenure
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 pr-32 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="text-gray-700 font-medium bg-transparent border-none focus:outline-none cursor-pointer pr-6 appearance-none"
                  >
                    <option value="Years">Years</option>
                    <option value="Months">Months</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-purple-600 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Compounding Frequency
              </label>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>Yearly</option>
                  <option>Semi-Annually</option>
                  <option>Quarterly</option>
                  <option>Monthly</option>
                  <option>Daily</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={calculateCD}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Right Side - Results and Graph */}
        <div>
          {result && (
            <>
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-5xl font-bold text-gray-900">
                      {currency}{result.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide mt-1">TOTAL AMOUNT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-gray-900">
                      {currency}{result.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide mt-1">INTEREST</div>
                  </div>
                </div>
                <div className="text-blue-600 text-lg">
                  {numberToWords(result.totalAmount)}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Calculation Graph</h3>
                <div className="flex justify-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                    <span className="text-sm text-gray-700">Initial Amount</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Total Amount</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: '#6b7280' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      label={{ value: 'Amount', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                      tickFormatter={(value) => `${currency}${(value/1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Initial Amount" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Total Amount" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interest by Frequency</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(frequencyMap).map((freq) => {
                    const p = parseFloat(principal);
                    const r = parseFloat(rate) / 100;
                    let t = parseFloat(time);
                    if (timeUnit === 'Months') t = t / 12;
                    const n = frequencyMap[freq];
                    const amount = p * Math.pow((1 + r/n), n*t);
                    const interest = amount - p;
                    
                    return (
                      <div key={freq} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="text-sm text-gray-600 mb-1">{freq}</div>
                        <div className="text-xl font-bold text-gray-900">
                          {currency}{interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
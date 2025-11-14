import React, { useState, useMemo } from "react";
import { Download } from "lucide-react";

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [durationYears, setDurationYears] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const calculations = useMemo(() => {
    const monthlyRate = annualReturn / 12 / 100;
    const totalMonths = durationYears * 12;

    let yearlyData = [];
    let currentValue = 0;
    let totalInvested = 0;

    for (let year = 1; year <= durationYears; year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvested += monthlyInvestment;
        currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
      }

      const gains = currentValue - totalInvested;
      const inflationAdjustedValue =
        currentValue / Math.pow(1 + inflationRate / 100, year);
      const realGains = inflationAdjustedValue - totalInvested;

      yearlyData.push({
        year,
        invested: totalInvested,
        value: currentValue,
        gains: gains,
        returnPct: (gains / totalInvested) * 100,
        inflationAdjustedValue: inflationAdjustedValue,
        realGains: realGains,
      });
    }

    const finalValue = currentValue;
    const totalInvestedAmount = totalInvested;
    const totalGains = finalValue - totalInvestedAmount;
    const inflationAdjustedFinalValue =
      finalValue / Math.pow(1 + inflationRate / 100, durationYears);
    const realGains = inflationAdjustedFinalValue - totalInvestedAmount;

    return {
      yearlyData,
      finalValue,
      totalInvestedAmount,
      totalGains,
      inflationAdjustedFinalValue,
      realGains,
    };
  }, [monthlyInvestment, durationYears, annualReturn, inflationRate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add header information
    csvContent += "Nifty 50 SIP Calculator\n\n";
    csvContent += "Input Parameters:\n";
    csvContent += `Monthly Investment,${monthlyInvestment}\n`;
    csvContent += `Duration (Years),${durationYears}\n`;
    csvContent += `Expected Annual Return,${annualReturn}%\n`;
    csvContent += `Inflation Rate,${inflationRate}%\n\n`;

    csvContent += "Summary:\n";
    csvContent += `Total Investment,${calculations.totalInvestedAmount.toFixed(
      2
    )}\n`;
    csvContent += `Final Value (Nominal),${calculations.finalValue.toFixed(
      2
    )}\n`;
    csvContent += `Total Gains (Nominal),${calculations.totalGains.toFixed(
      2
    )}\n`;
    csvContent += `Final Value (Inflation Adjusted),${calculations.inflationAdjustedFinalValue.toFixed(
      2
    )}\n`;
    csvContent += `Real Gains (After Inflation),${calculations.realGains.toFixed(
      2
    )}\n\n`;

    // Add yearly breakdown
    csvContent += "Year-wise Breakdown:\n";
    csvContent +=
      "Year,Total Invested,Nominal Value,Nominal Gains,Inflation Adjusted Value,Real Gains,Return %\n";

    calculations.yearlyData.forEach((row) => {
      csvContent += `${row.year},${row.invested.toFixed(2)},${row.value.toFixed(
        2
      )},${row.gains.toFixed(2)},${row.inflationAdjustedValue.toFixed(
        2
      )},${row.realGains.toFixed(2)},${row.returnPct.toFixed(2)}%\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Nifty50_SIP_Calculator_${durationYears}years.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900">
              Nifty 50 SIP Calculator
            </h1>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Download size={20} />
              Export to Excel
            </button>
          </div>

          {/* Input Controls */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Investment (₹)
              </label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-semibold"
                min="100"
                step="1000"
              />
              <input
                type="range"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full mt-3"
                min="1000"
                max="100000"
                step="1000"
              />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration (Years)
              </label>
              <input
                type="number"
                value={durationYears}
                onChange={(e) => setDurationYears(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg font-semibold"
                min="1"
                max="50"
              />
              <input
                type="range"
                value={durationYears}
                onChange={(e) => setDurationYears(Number(e.target.value))}
                className="w-full mt-3"
                min="1"
                max="50"
              />
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Return (% p.a.)
              </label>
              <input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 text-lg font-semibold"
                min="1"
                max="30"
                step="0.5"
              />
              <input
                type="range"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="w-full mt-3"
                min="5"
                max="20"
                step="0.5"
              />
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inflation Rate (% p.a.)
              </label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 text-lg font-semibold"
                min="1"
                max="15"
                step="0.5"
              />
              <input
                type="range"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full mt-3"
                min="3"
                max="10"
                step="0.5"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-blue-100 text-sm font-semibold mb-2">
                Total Investment
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(calculations.totalInvestedAmount)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-purple-100 text-sm font-semibold mb-2">
                Final Value
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(calculations.finalValue)}
              </p>
              <p className="text-xs text-purple-200 mt-1">(Nominal)</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-green-100 text-sm font-semibold mb-2">
                Nominal Gains
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(calculations.totalGains)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-orange-100 text-sm font-semibold mb-2">
                Inflation Adjusted
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(calculations.inflationAdjustedFinalValue)}
              </p>
              <p className="text-xs text-orange-200 mt-1">(Today's Value)</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-red-100 text-sm font-semibold mb-2">
                Real Gains
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(calculations.realGains)}
              </p>
              <p className="text-xs text-red-200 mt-1">(After Inflation)</p>
            </div>
          </div>

          {/* Yearly Breakdown Table */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Year-wise Breakdown
            </h2>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Year</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Invested
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Nominal Value
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Nominal Gains
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Inflation Adjusted
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Real Gains
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.yearlyData.map((row, index) => (
                    <tr
                      key={row.year}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-700">
                        {row.year}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatCurrency(row.invested)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(row.value)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        {formatCurrency(row.gains)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-orange-600">
                        {formatCurrency(row.inflationAdjustedValue)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-indigo-600">
                        {formatCurrency(row.realGains)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Historical Nifty 50 returns have averaged
              around 12-14% annually. India's average inflation has been around
              5-6% over the long term. The inflation-adjusted values show the
              purchasing power of your investment in today's terms. This
              calculator assumes monthly compounding. Past performance is not
              indicative of future results. Please consult a financial advisor
              for investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;

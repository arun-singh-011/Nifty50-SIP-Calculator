# 📈 Nifty 50 SIP Calculator

A comprehensive React-based SIP (Systematic Investment Plan) calculator designed specifically for Nifty 50 investments. Calculate your investment returns with inflation adjustment, view year-wise breakdowns, and export detailed reports.

## ✨ Features

- **💰 Real-time Calculations**: Instantly calculate SIP returns with monthly compounding
- **📊 Inflation Adjustment**: View both nominal and inflation-adjusted returns
- **📅 Year-wise Breakdown**: Detailed yearly progression of your investments
- **📥 CSV Export**: Download complete calculation reports in Excel-compatible format
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🎨 Modern UI**: Clean, intuitive interface with gradient designs
- **🔄 Interactive Sliders**: Easy input with range sliders for all parameters

## 🖼️ Preview

The calculator provides:
- Total Investment amount
- Final Value (Nominal)
- Nominal Gains
- Inflation Adjusted Value
- Real Gains (After Inflation)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/arun-singh-011/Nifty50-SIP-Calculator.git
cd Nifty50-SIP-Calculator
```

2. Navigate to the frontend directory
```bash
cd frontend
```

3. Install dependencies
```bash
npm install
```

4. Install Tailwind CSS and Lucide React
```bash
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npx tailwindcss init -p
```

5. Configure Tailwind CSS

Create/update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

6. Add Tailwind directives to your CSS file (e.g., `src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. Start the development server
```bash
npm run dev
```

8. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Usage

1. **Set Monthly Investment**: Enter the amount you plan to invest monthly (₹1,000 - ₹1,00,000)
2. **Choose Duration**: Select investment period in years (1-50 years)
3. **Set Expected Return**: Input expected annual return rate (5%-20%)
4. **Set Inflation Rate**: Enter expected inflation rate (3%-10%)
5. **View Results**: See instant calculations with detailed breakdowns
6. **Export Data**: Click "Export to Excel" to download a CSV report

## 📊 Calculation Methodology

The calculator uses the following formulas:

- **Monthly Return Rate**: Annual Return / 12 / 100
- **SIP Future Value**: Uses compound interest with monthly contributions
- **Inflation Adjustment**: Current Value / (1 + Inflation Rate)^Years
- **Real Gains**: Inflation Adjusted Value - Total Investment

## 🛠️ Built With

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Next generation frontend tooling

## 📁 Project Structure

```
Nifty50-SIP-Calculator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SIPCalculator.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 💡 Key Assumptions

- **Historical Nifty 50 Returns**: 12-14% annually (long-term average)
- **India's Inflation**: 5-6% average over the long term
- **Compounding**: Monthly compounding of returns
- **Consistency**: Assumes regular monthly investments without breaks

## ⚠️ Disclaimer

This calculator is for educational and illustrative purposes only. Past performance is not indicative of future results. The calculations are based on assumptions and may not reflect actual investment outcomes. Please consult a certified financial advisor before making investment decisions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Arun Singh**
- GitHub: [@arun-singh-011](https://github.com/arun-singh-011)

## 🙏 Acknowledgments

- Inspired by the need for better investment planning tools
- Built with modern React best practices
- Designed for the Indian investment market

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

⭐ Star this repository if you find it helpful!

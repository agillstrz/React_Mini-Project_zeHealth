/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        kiri: {
          "0%, 100%": { transform: "translateY(-20%)" },
          "50%": { transform: "rotate(-3deg)" },
        },

        kanan: {
          "0%, 100%": { transform: "translateX(-10%)" },
          "50%": { transform: "rotate(0)" },
        },
        atas: {
          "0%, 100%": { transform: "translatey(-5%)" },
          "50%": { transform: "rotate(0)" },
        },
        bawah: {
          "0%, 100%": { transform: "translatey(5%)" },
          "50%": { transform: "rotate(0)" },
        },
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "bounce-1": "kanan 6s infinite",
        "bounce-2": "kiri 6s infinite",
        "bounce-3": "atas 3s infinite",
        "bounce-4": "bawah 3s infinite",
      },
      colors: {
        color1: "#48c3d6",
        color2: "#283754",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"],
  },
};

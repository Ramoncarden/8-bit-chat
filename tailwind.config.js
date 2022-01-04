//prettier-ignore
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixeboy: ['Pixeboy', 'sans-serif'],
        ps2: ['Press-Start-2p', 'sans-serif'],
      },
      backgroundImage: theme => ({
        'brickWall':
          "url('C:/Users/Deliciouz/Documents/react-projects/8-bit-chat/src/assets/325-3256047_bricks-wall-8-bit-super-mario-brick-hd.png')",
        'animation': "url('https://art.pixilart.com/d6b672af04f9e57.gif')"
      }),
    },
  },
  plugins: [],
};

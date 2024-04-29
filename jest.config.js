const config = {
  // ความกว้างอื่นๆ ที่คุณต้องการกำหนด...

  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@components(.*)$': '<rootDir>/components$1', // ตัวอย่างเพิ่มเติมตามความเหมาะสม
    // เพิ่ม alias อื่นๆ ตามความเหมาะสม
  },

  testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  // ความกว้างอื่นๆ ที่คุณต้องการกำหนด...
};

module.exports = config;

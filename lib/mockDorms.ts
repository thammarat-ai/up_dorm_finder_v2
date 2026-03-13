export const MOCK_DORMS = [
  {
    id: 'up-dorm-001',
    name: 'หอพักพะเยาแกรนด์แลนด์',
    zone: 'FRONT_UP_RIGHT' as const,
    lat: 19.0282,
    lng: 99.8975,
    monthlyPrice: 4500,
    deposit: 5000,
    advancedPayment: 4500,
    waterBillingType: 'PER_UNIT' as const,
    waterRate: 100,
    electricityType: 'PER_UNIT' as const,
    electricityRate: 7,
    commonFee: 200,
    inRoom: {
      aircon: true,
      waterHeater: true,
      fridge: true,
      bedSize: 'Queen',
      desk: true
    },
    publicFacilities: {
      gym: true,
      laundry: true,
      parking: true,
      elevator: true
    },
    rules: {
      pets: false,
      smoking: false,
      curfew: 'None'
    },
    securityFeatures: ['CCTV', 'Keycard', 'Security Guard 24h'],
    isVerified: true,
    internetScore: 4.9, // High internet score as requested
    noiseScore: 4.2,
    ownerScore: 4.8,
    purpleBusDist: 50,
  },
  {
    id: 'up-dorm-002',
    name: 'แม่กาเรสซิเดนท์',
    zone: 'MAE_KA' as const,
    lat: 19.0235,
    lng: 99.8992,
    monthlyPrice: 2800,
    deposit: 3000,
    advancedPayment: 2800,
    waterBillingType: 'FIXED' as const,
    waterRate: 100,
    electricityType: 'GOVERNMENT_RATE' as const, // Government rate as requested
    electricityRate: null,
    commonFee: 0,
    inRoom: {
      fan: true,
      bedSize: 'Single',
      desk: true,
      closet: true
    },
    publicFacilities: {
      laundry: true,
      parking: true,
      waterDispenser: true
    },
    rules: {
      pets: true,
      smoking: false,
      curfew: '23:00'
    },
    securityFeatures: ['Keycard'],
    isVerified: false,
    internetScore: 3.5,
    noiseScore: 4.5,
    ownerScore: 4.0,
    purpleBusDist: 450,
  },
  {
    id: 'up-dorm-003',
    name: 'พะเยาวิว (หน้า ม. พะเยา ฝั่งซ้าย)',
    zone: 'FRONT_UP_LEFT' as const,
    lat: 19.0295,
    lng: 99.8942,
    monthlyPrice: 3800,
    deposit: 4000,
    advancedPayment: 3800,
    waterBillingType: 'PER_UNIT' as const,
    waterRate: 18,
    electricityType: 'PER_UNIT' as const,
    electricityRate: 8,
    commonFee: 150,
    inRoom: {
      aircon: true,
      waterHeater: true,
      fridge: false,
      bedSize: 'Double',
      balcony: true
    },
    publicFacilities: {
      laundry: true,
      parking: true,
      cctv: true
    },
    rules: {
      pets: false,
      smoking: true,
      curfew: 'None'
    },
    securityFeatures: ['CCTV', 'Keycard'],
    isVerified: true,
    internetScore: 4.2,
    noiseScore: 3.8,
    ownerScore: 4.5,
    purpleBusDist: 120,
  },
  {
    id: 'up-dorm-004',
    name: 'หอพักริมกว๊าน อินทาวน์',
    zone: 'IN_TOWN' as const,
    lat: 19.1652,
    lng: 99.9024,
    monthlyPrice: 5500,
    deposit: 10000,
    advancedPayment: 5500,
    waterBillingType: 'GOVERNMENT_RATE' as const,
    waterRate: null,
    electricityType: 'GOVERNMENT_RATE' as const,
    electricityRate: null,
    commonFee: 300,
    inRoom: {
      aircon: true,
      waterHeater: true,
      smartTv: true,
      kitchenette: true,
      kingBed: true
    },
    publicFacilities: {
      parking: true,
      elevator: true,
      fingerprintScan: true
    },
    rules: {
      pets: false,
      smoking: false,
      curfew: 'None'
    },
    securityFeatures: ['CCTV', 'Fingerprint', 'Security Guard'],
    isVerified: true,
    internetScore: 4.7,
    noiseScore: 4.8,
    ownerScore: 4.9,
    purpleBusDist: 5000, // Distance in meters from UP
  },
  {
    id: 'up-dorm-005',
    name: 'หอพักบัณฑิตพะเยา',
    zone: 'FRONT_UP_RIGHT' as const,
    lat: 19.0275,
    lng: 99.8988,
    monthlyPrice: 3200,
    deposit: 3200,
    advancedPayment: 3200,
    waterBillingType: 'FIXED' as const,
    waterRate: 150,
    electricityType: 'PER_UNIT' as const,
    electricityRate: 7,
    commonFee: 100,
    inRoom: {
      aircon: true,
      bedSize: 'Queen',
      desk: true,
      wifiRouter: true
    },
    publicFacilities: {
      laundry: true,
      parking: true,
      studyRoom: true
    },
    rules: {
      pets: false,
      smoking: false,
      curfew: 'None'
    },
    securityFeatures: ['CCTV', 'Keycard'],
    isVerified: true,
    internetScore: 4.8,
    noiseScore: 4.0,
    ownerScore: 4.6,
    purpleBusDist: 300,
  },
{
    id: 'up-dorm-006',
    name: 'KM2',
    zone: 'FRONT_UP_RIGHT' as const,
    lat: 19.0275,
    lng: 99.8988,
    monthlyPrice: 12000,
    deposit: 3200,
    advancedPayment: 3200,
    waterBillingType: 'FIXED' as const,
    waterRate: 150,
    electricityType: 'PER_UNIT' as const,
    electricityRate: 7,
    commonFee: 100,
    inRoom: {
      aircon: true,
      bedSize: 'Queen',
      desk: true,
      wifiRouter: true
    },
    publicFacilities: {
      laundry: true,
      parking: true,
      studyRoom: true
    },
    rules: {
      pets: false,
      smoking: false,
      curfew: 'None'
    },
    securityFeatures: ['CCTV', 'Keycard'],
    isVerified: true,
    internetScore: 4.8,
    noiseScore: 4.0,
    ownerScore: 4.6,
    purpleBusDist: 300,
  }
  
];

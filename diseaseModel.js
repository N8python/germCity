const n8FluDist = (age) => {
        if (age <= 10) {
            return -0.005 * age ** 2 + 0.7;
        }
        if (age <= 32.329) {
            return 0.1 + 0.1 * 2 ** (0.07 * (age - 10));
        }
        if (age <= 50) {
            return -0.0001 * age ** 2 + 0.5;
        }
        return (1.0281 ** (age - 50)) / 4
    }
    // r0 = 2
    // Mortality of 15-20%
const disease = {
    name: "N8 Flu",
    incubation: {
        range: [1, 3],
        asympotamic: {
            chance: 0.1,
            ageDecay: -1 / 800
        },
        contagiousnessBegins: [-1, 0]
    },
    initContagiousness: 0.0001,
    initContagiousRange: 25,
    exposureToCaseChance: 0.0005,
    phases: [{
        // Initial Symptoms
        symptoms: "mild respiratory",
        mortalityRate: 0,
        range: [1, 2],
        contagiousness: 0.00015,
        contagiousRange: 40,
        progressionFunc: n8FluDist,
        next: {
            1: 0.4,
            2: 0.8,
            3: 0.95,
            4: 1
        }
    }, {
        // Recovery
        symptoms: "mild respiratory",
        recovery: true,
        mortalityRate: 0,
        range: [2, 4],
        contagiousness: 0,
        contagiousRange: 0,
        progressionFunc: n8FluDist,
        next: {
            "resolve": 1
        }
    }, {
        // Moderate Symptoms
        symptoms: "moderate respiratory",
        mortalityRate: 1,
        range: [1, 2],
        contagiousness: 0.00025,
        contagiousRange: 50,
        progressionFunc: n8FluDist,
        next: {
            1: 0.75,
            3: 0.9,
            4: 1
        }

    }, {
        // Sever symptoms
        symptoms: "pneumonia",
        mortalityRate: 20,
        range: [3, 5],
        contagiousness: 0.0005,
        contagiousRange: 75,
        progressionFunc: n8FluDist,
        next: {
            1: 0.75,
            4: 1
        }
    }, {
        symptoms: "ards",
        mortalityRate: 95,
        range: [1, 2],
        contagiousness: 0.0005,
        contagiousRange: 75,
        progressionFunc: n8FluDist,
        next: {
            1: 1
        }
    }]
};
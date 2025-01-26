const MUSCLEWIKI_BASE_URL = 'https://musclewiki.com/';

export const getMuscleExercises = async (muscle, equipment = '') => {
  try {
    // Map our muscle IDs to MuscleWiki's format
    const muscleMap = {
      shoulders: 'Shoulders',
      chest: 'Chest',
      biceps: 'Biceps',
      triceps: 'Triceps',
      back: 'Back',
      abs: 'Abs',
      obliques: 'Obliques',
      lower_back: 'Lower_Back',
      quads: 'Quadriceps',
      hamstrings: 'Hamstrings',
      calves: 'Calves',
      glutes: 'Glutes',
      forearms: 'Forearms',
      neck: 'Neck'
    };

    const mappedMuscle = muscleMap[muscle] || muscle;
    
    // Fetch from MuscleWiki's public endpoints
    const response = await fetch(`${MUSCLEWIKI_BASE_URL}api/exercises/${mappedMuscle}`);
    const data = await response.json();
    
    // Filter by equipment if specified
    if (equipment) {
      return data.filter(exercise => exercise.equipment.includes(equipment));
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching from MuscleWiki:', error);
    return [];
  }
};

export const muscleGroups = {
  front: {
    chest: {
      name: 'Chest',
      path: 'M 85,95 C 90,100 100,105 115,95 C 115,105 100,115 85,105 Z',
      exercises: ['bench-press', 'push-ups', 'dumbbell-flyes']
    },
    shoulders: {
      name: 'Shoulders',
      path: 'M 75,85 C 70,90 65,95 70,100 M 125,85 C 130,90 135,95 130,100',
      exercises: ['overhead-press', 'lateral-raises', 'front-raises']
    },
    biceps: {
      name: 'Biceps',
      path: 'M 65,110 C 60,120 60,130 65,140 M 135,110 C 140,120 140,130 135,140',
      exercises: ['bicep-curls', 'hammer-curls', 'chin-ups']
    },
    abs: {
      name: 'Abs',
      path: 'M 90,120 L 110,120 L 110,160 L 90,160 Z',
      exercises: ['crunches', 'planks', 'leg-raises']
    },
    quads: {
      name: 'Quadriceps',
      path: 'M 80,180 C 75,200 75,220 80,240 M 120,180 C 125,200 125,220 120,240',
      exercises: ['squats', 'leg-press', 'lunges']
    }
  },
  back: {
    lats: {
      name: 'Latissimus Dorsi',
      path: 'M 75,100 C 85,120 115,120 125,100 L 125,140 L 75,140 Z',
      exercises: ['pull-ups', 'lat-pulldowns', 'rows']
    },
    traps: {
      name: 'Trapezius',
      path: 'M 85,80 L 115,80 L 100,110 Z',
      exercises: ['shrugs', 'face-pulls', 'upright-rows']
    },
    triceps: {
      name: 'Triceps',
      path: 'M 70,110 C 65,120 65,130 70,140 M 130,110 C 135,120 135,130 130,140',
      exercises: ['tricep-pushdowns', 'skull-crushers', 'dips']
    },
    calves: {
      name: 'Calves',
      path: 'M 85,280 C 80,290 80,300 85,310 M 115,280 C 120,290 120,300 115,310',
      exercises: ['calf-raises', 'jump-rope', 'box-jumps']
    },
    hamstrings: {
      name: 'Hamstrings',
      path: 'M 85,180 C 80,200 80,220 85,240 M 115,180 C 120,200 120,220 115,240',
      exercises: ['deadlifts', 'leg-curls', 'good-mornings']
    }
  }
};

export const getExerciseDetails = async (exerciseId) => {
  try {
    const response = await fetch(`${MUSCLEWIKI_BASE_URL}api/exercises/details/${exerciseId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercise details:', error);
    return null;
  }
}; 
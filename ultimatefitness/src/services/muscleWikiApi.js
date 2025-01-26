const BASE_URL = 'https://musclewiki.p.rapidapi.com';
const API_KEY = 'YOUR_RAPIDAPI_KEY'; // You'll need to get this from RapidAPI

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
};

export const getMuscleExercises = async (muscle, equipment = '') => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/${muscle}${equipment ? `?equipment=${equipment}` : ''}`, {
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

export const getMuscleGroups = async () => {
  try {
    const response = await fetch(`${BASE_URL}/muscles`, {
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching muscle groups:', error);
    return [];
  }
}; 
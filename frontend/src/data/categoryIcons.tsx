import type { JSX } from "react";
import {
    FaHandshake,
    FaArrowDown19,
    FaPalette,
    FaCalendarDays,
    FaClock,
    FaShapes,
    FaQuestion,
    FaUserGroup,
    FaPerson,
    FaUserTie,
    FaFaceSmile,
    FaShirt,
    FaGlasses,
    FaBriefcaseMedical,
    FaHouse,
    FaCouch,
    FaKitchenSet,
    FaCarrot,
    FaMugHot,
    FaBroom,
    FaBath,
    FaCity,
    FaBus,
    FaTrafficLight,
    FaGraduationCap,
    FaUserDoctor,
    FaBriefcase,
    FaMoneyBillWave,
    FaTruckMedical,
    FaCat,
    FaHippo,
    FaFish,
    FaLocust, // or FaBug
    FaSeedling,
    FaCloudSun,
    FaMountainSun,
    FaRocket,
    FaCubes,
    FaDumbbell,
    FaGamepad,
    FaMusic,
    FaMasksTheater,
    FaLaptop,
    FaCakeCandles,
    FaPersonRunning,
    FaComments,
    FaBrain,
    FaStar,
    FaFingerprint, // Personality/Unique
    FaMapLocationDot,
    FaHandPointRight, // Pronouns (You/He/She)
    FaLink
} from "react-icons/fa6";

export interface CategoryIcon {
    name: string;
    key: string;
    icon: JSX.Element;
}

const categoryIcons: CategoryIcon[] = [
    // --- Essentials & Basics ---
    {
        name: "Greetings & Manners",
        key: "greetings_manners",
        icon: <FaHandshake />,
    },
    {
        name: "Numbers & Counting",
        key: "numbers",
        icon: <FaArrowDown19 />,
    },
    {
        name: "Colors & Patterns",
        key: "colors",
        icon: <FaPalette />,
    },
    {
        name: "Time & Calendar",
        key: "time_basics",
        icon: <FaCalendarDays />,
    },
    {
        name: "Telling Time",
        key: "time_telling",
        icon: <FaClock />,
    },
    {
        name: "Shapes & Geometry",
        key: "shapes_geometry",
        icon: <FaShapes />,
    },
    {
        name: "Question Words",
        key: "question_words",
        icon: <FaQuestion />,
    },

    // --- Me & People ---
    {
        name: "Family & Relationships",
        key: "family_relations",
        icon: <FaUserGroup />,
    },
    {
        name: "Body Parts",
        key: "body_parts",
        icon: <FaPerson />,
    },
    {
        name: "Physical Appearance",
        key: "appearance",
        icon: <FaUserTie />,
    },
    {
        name: "Feelings & Emotions",
        key: "emotions",
        icon: <FaFaceSmile />,
    },
    {
        name: "Clothing & Wear",
        key: "clothing_wear",
        icon: <FaShirt />,
    },
    {
        name: "Accessories & Jewelry",
        key: "accessories",
        icon: <FaGlasses />,
    },
    {
        name: "Health & Medicine",
        key: "health_medicine",
        icon: <FaBriefcaseMedical />,
    },

    // --- Home & Daily Routine ---
    {
        name: "House & Rooms",
        key: "house_rooms",
        icon: <FaHouse />,
    },
    {
        name: "Furniture & Decor",
        key: "furniture_decor",
        icon: <FaCouch />,
    },
    {
        name: "Kitchen & Utensils",
        key: "kitchen_utensils",
        icon: <FaKitchenSet />,
    },
    {
        name: "Food & Ingredients",
        key: "food_ingredients",
        icon: <FaCarrot />,
    },
    {
        name: "Drinks & Beverages",
        key: "drinks_beverages",
        icon: <FaMugHot />,
    },
    {
        name: "Cleaning & Chores",
        key: "cleaning_chores",
        icon: <FaBroom />,
    },
    {
        name: "Bathroom & Hygiene",
        key: "bathroom_hygiene",
        icon: <FaBath />,
    },

    // --- Society & City Life ---
    {
        name: "City & Buildings",
        key: "city_buildings",
        icon: <FaCity />,
    },
    {
        name: "Transport & Vehicles",
        key: "transportation",
        icon: <FaBus />,
    },
    {
        name: "Driving & Traffic",
        key: "driving_traffic",
        icon: <FaTrafficLight />,
    },
    {
        name: "Education & School",
        key: "education_school",
        icon: <FaGraduationCap />,
    },
    {
        name: "Jobs & Professions",
        key: "jobs_professions",
        icon: <FaUserDoctor />,
    },
    {
        name: "Office & Business",
        key: "office_work",
        icon: <FaBriefcase />,
    },
    {
        name: "Shopping & Money",
        key: "shopping_money",
        icon: <FaMoneyBillWave />,
    },
    {
        name: "Emergency & Safety",
        key: "emergency_safety",
        icon: <FaTruckMedical />,
    },

    // --- Nature & The World ---
    {
        name: "Pets & Farm Animals",
        key: "animals_pets",
        icon: <FaCat />,
    },
    {
        name: "Wild Animals",
        key: "animals_wild",
        icon: <FaHippo />,
    },
    {
        name: "Sea Life",
        key: "animals_sea",
        icon: <FaFish />,
    },
    {
        name: "Insects & Bugs",
        key: "insects_bugs",
        icon: <FaLocust />,
    },
    {
        name: "Plants & Flowers",
        key: "plants_trees",
        icon: <FaSeedling />,
    },
    {
        name: "Weather & Climate",
        key: "weather_climate",
        icon: <FaCloudSun />,
    },
    {
        name: "Landscapes & Geography",
        key: "landscapes_geography",
        icon: <FaMountainSun />,
    },
    {
        name: "Space & Universe",
        key: "space_universe",
        icon: <FaRocket />,
    },
    {
        name: "Materials & Elements",
        key: "materials",
        icon: <FaCubes />,
    },

    // --- Culture, Tech & Leisure ---
    {
        name: "Sports & Fitness",
        key: "sports_fitness",
        icon: <FaDumbbell />,
    },
    {
        name: "Hobbies & Games",
        key: "hobbies_games",
        icon: <FaGamepad />,
    },
    {
        name: "Music & Instruments",
        key: "music_instruments",
        icon: <FaMusic />,
    },
    {
        name: "Arts & Media",
        key: "arts_media",
        icon: <FaMasksTheater />,
    },
    {
        name: "Technology",
        key: "technology",
        icon: <FaLaptop />,
    },
    {
        name: "Holidays & Party",
        key: "celebrations",
        icon: <FaCakeCandles />,
    },

    // --- Grammar & Concepts ---
    {
        name: "Action Verbs",
        key: "verbs_action",
        icon: <FaPersonRunning />,
    },
    {
        name: "Communication Verbs",
        key: "verbs_communication",
        icon: <FaComments />,
    },
    {
        name: "Thinking Verbs",
        key: "verbs_thinking",
        icon: <FaBrain />,
    },
    {
        name: "Common Adjectives",
        key: "adjectives_common",
        icon: <FaStar />,
    },
    {
        name: "Personality Traits",
        key: "adjectives_personality",
        icon: <FaFingerprint />,
    },
    {
        name: "Positions & Directions",
        key: "positions_directions",
        icon: <FaMapLocationDot />,
    },
    {
        name: "Pronouns",
        key: "pronouns",
        icon: <FaHandPointRight />,
    },
    {
        name: "Connecting Words",
        key: "conjunctions_connectors",
        icon: <FaLink />,
    }
];
export function getCategoryIcons(): CategoryIcon[] {
    return categoryIcons;
}
const { PARTICIPANT, RESEARCHER } = require('./modelConstants')

const experience_options = {
    1: '0 - 5 Years',
    2: '6 - 10 Years',
    3: '11 - 15 Years',
    4: '16 - 20 Years',
    5: '20+ Years'
}
const industry = {
    1: "Aerospace & Defence",
    2: "Agribusiness",
    3: "Automotive",
    4: "Banking",
    5: "Consumer Products",
    6: "Fashion",
    7: "Healthcare",
    8: "High Tech",
    9: "Industrial Machines & Components",
    10: "Insurance",
    11: "Life Sciences",
    12: "Retail",
    13: "Telecommunications",
    14: "Travel and Leisure",
    15: "IT/ITeS",
    16: "Engineering,Construction & Operations",
    17: "Transportation and Logistics",
    18: "Media & Entertainment",
    19: "Sports",
    20: "Oil, Gas, and Energy",
    21: "Chemicals",
    22: "Mining",
    23: "Utilities",
    24: "Others (please specify)"
}
const job_function = {
    1: "Accountant",
    2: "Admin",
    3: "Business Development",
    4: "Consulting",
    5: "Corporate Stratergy",
    6: "Customer Care",
    7: "Customer Success",
    8: "Finance",
    9: "H.R",
    10: "Inside Sales",
    11: "Legal",
    12: "Marketing",
    13: "Operations",
    14: "Pre-Sales",
    15: "Procurement",
    16: "Product Management",
    17: "QA/QC",
    18: "R&D",
    19: "Sales",
    20: "User Research",
    21: "UX Design",
    22: "UX Research",
    23: "Others (please specify)"
}
const highest_education = {
    1: "10th - 12th",
    2: "Bachelors",
    3: "Diploma",
    4: "Masters",
    5: "PhD"
}
const gender = {
    1: "Male",
    2: "Female"
}
const potential_user_types = {
    [PARTICIPANT]: "Participant",
    [RESEARCHER]: "Researcher"
}
module.exports = { experience_options, industry, job_function, job_function, highest_education, gender, potential_user_types }

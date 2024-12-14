export const sampleUsers = [
  {
    id: '1',
    name: 'Jane Educator',
    email: 'jane@example.com',
    password: 'password123', // In a real app, this would be hashed
    bio: 'Experienced educator in the arts with a passion for teaching.',
    company: 'Creative Arts Studio',
    accountType: 'educator',
    avatar: 'https://i.pravatar.cc/150?img=23'
  },
  {
    id: '2',
    name: 'John Freelancer',
    email: 'free@lancer.com',
    password: 'freelance123', // In a real app, this would be hashed
    bio: 'Freelance artist specializing in digital art and illustration.',
    company: '',
    accountType: 'freelancer',
    avatar: 'https://i.pravatar.cc/150?img=24'
  },
  {
    id: '3',
    name: 'Sarah Company',
    email: 'sarah@company.com',
    password: 'company123', // In a real app, this would be hashed
    bio: 'Leading provider of art supplies and creative solutions.',
    company: 'ArtCo Supplies',
    accountType: 'company',
    avatar: 'https://i.pravatar.cc/150?img=25'
  }
];

export const sampleGigs = [
  {
    id: '1',
    title: 'Portrait Painting Commission',
    description: 'ArtCo Supplies is seeking a freelancer for a portrait painting commission.',
    price: 150,
    user: { id: '3', name: 'Sarah Company' },
    type: 'gig'
  },
  {
    id: '2',
    title: 'Logo Design Project',
    description: 'ArtCo Supplies needs a freelance designer for a logo design project.',
    price: 200,
    user: { id: '3', name: 'Sarah Company' },
    type: 'gig'
  },
  {
    id: '3',
    title: 'Website Development Gig',
    description: 'ArtCo Supplies is looking for a freelance web developer for a corporate website.',
    price: 500,
    user: { id: '3', name: 'Sarah Company' },
    type: 'gig'
  },
  {
    id: '4',
    title: 'Custom Illustration Project',
    description: 'ArtCo Supplies requires a freelance illustrator for a custom digital illustration project.',
    price: 100,
    user: { id: '3', name: 'Sarah Company' },
    type: 'gig'
  }
];

export const sampleCourses = [
  {
    id: '1',
    title: 'Watercolor Basics',
    description: 'Jane Educator teaches the fundamentals of watercolor painting.',
    price: 79.99,
    user: { id: '1', name: 'Jane Educator' },
    type: 'course'
  },
  {
    id: '2',
    title: 'Digital Illustration Masterclass',
    description: 'Jane Educator guides you through mastering digital illustration techniques.',
    price: 129.99,
    user: { id: '1', name: 'Jane Educator' },
    type: 'course'
  },
  {
    id: '3',
    title: 'Photography Essentials',
    description: 'John Freelancer shares essential photography skills and techniques.',
    price: 99.99,
    user: { id: '2', name: 'John Freelancer' },
    type: 'course'
  },
  {
    id: '4',
    title: 'Art Business 101',
    description: 'Sarah Company provides insights on turning art into a business.',
    price: 149.99,
    user: { id: '3', name: 'Sarah Company' },
    type: 'course'
  }
];

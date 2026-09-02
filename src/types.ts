export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  imagePlaceholderStyle?: string;
  date: string;
  readTime: string;
  category: string;
  isPinned?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  tags?: string[];
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface Appointment {
  id?: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

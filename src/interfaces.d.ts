export interface Achievement {
    title: string,
    titleEn: string,
    picture: string
}

export interface Announcement {
    pl: string,
    en: string
}

export interface Category {
    title: string,
    titleEn: string,
    color: string,
    link: string,
    projects?: Project[]
}

export interface Comment {
    author: string,
    text: string,
    written: Date,
    project: Project,
    stars: number
}

export interface Order {
    _id: string,
    name: string,
    email: string,
    whatYouWish: string,
    status: string,
    statusEn: string,
    previousWebsite: string,
    type: string,
    websiteTitle: string,
    orderDate: Date,
    budget: number,
    isSent: boolean
}

export interface Project {
    _id: string,
    title: string,
    description: string,
    profile: string,
    status: string,
    link: string,
    subpageLink: string,
    pictures: string[],
    reviews: Comment[],
    categories: Category[],
    added: Date,
    edited?: Date | number,
	en: string,
	statusEn: string
}

export interface Service {
    _id: string,
    icon: string,
    title: string,
    titleEn: string,
    description: string,
    descriptionEn: string
}

export interface Technology {
    _id: string,
    icon: string,
    name: string
}


export interface User {
    username: string,
    password: string,
    about: string,
    en: string,
    email: string,
    resetPasswordToken: string,
    resetPasswordExpires: Date,
    fbLink: string,
    fbDesc: string,
    igLink: string,
    igDesc: string,
    achievements: Achievement[],
    services: Service[],
    technologies: Technology[]
}
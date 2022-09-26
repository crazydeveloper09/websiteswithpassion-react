export interface Achievement {
    _id: string,
    title: string,
    titleEn: string,
    picture: string
}

export interface Announcement {
    _id: string,
    pl: string,
    en: string
}

export interface Category {
    _id: string,
    title: string,
    titleEn: string,
    color: string,
    link: string,
    icon: string,
    projects?: Project[]
}

export interface Comment {
    author: string,
    text: string,
    written: Date,
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
    phone:string,
    isSent: boolean,
    rockLink: string | "https://space.new/34x8kq8ivvse",
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
    categories: Category[] & string & {},
    added: Date,
    edited?: Date | number,
	en: string,
	statusEn: string
}

export interface ProjectForm {
    _id: string,
    title: string,
    description: string,
    profile: string,
    status: string,
    link: string,
	en: string,
	statusEn: string,
    categories: string[]
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
    _id: string,
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
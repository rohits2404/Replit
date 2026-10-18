import type {
    AgentFeature,
    ExamplePrompt,
    NavGroup,
    NavLink,
    PlatformFeature,
    PricingPlan,
    ProjectCategory,
    Testimonial,
} from "@/lib/types";

export const topNavLinks: NavLink[] = [
    { label: "Security", href: "/security" },
    { label: "Pricing", href: "#pricing" },
];

export const navGroups: NavGroup[] = [
    {
        title: "Products",
        links: [
            { label: "Agent", href: "/agent" },
            { label: "Design", href: "/design" },
            { label: "Databases", href: "/databases" },
            { label: "Publish Apps", href: "/publish" },
            { label: "Integrations", href: "/integrations" },
            { label: "Mobile", href: "/mobile" },
        ],
    },
    {
        title: "For Work",
        links: [
            {
                label: "Pro",
                href: "/pro",
                description: "Replit For Serious Builders",
            },
            {
                label: "Enterprise",
                href: "/enterprise",
                description: "Replit With Enterprise-Grade Security & Controls",
            },
        ],
        subsections: [
            {
                title: "Use Cases",
                links: [
                    { label: "Business Apps", href: "/use-cases/business" },
                    { label: "Mobile Apps", href: "/use-cases/mobile" },
                    {
                        label: "Rapid Prototyping",
                        href: "/use-cases/prototyping",
                    },
                ],
            },
            {
                title: "Roles",
                links: [
                    { label: "Enterprise", href: "/roles/enterprise" },
                    { label: "PM", href: "/roles/pm" },
                    { label: "Designers", href: "/roles/designers" },
                    { label: "Operations", href: "/roles/operations" },
                    { label: "Software Developers", href: "/roles/developers" },
                    { label: "SMB Owners", href: "/roles/smb" },
                    { label: "Founders", href: "/roles/founders" },
                ],
            },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Partners", href: "/partners" },
            { label: "Community", href: "/community" },
            { label: "Expert Network", href: "/experts" },
            { label: "Customer Stories", href: "/stories" },
            { label: "Gallery", href: "/gallery" },
            { label: "Blog", href: "/blog" },
            { label: "News", href: "/news" },
            { label: "Vibecon", href: "/vibecon", accent: true },
        ],
    },
];

export const projectCategories: ProjectCategory[] = [
    { id: "website", label: "Website", icon: "website" },
    { id: "mobile", label: "Mobile", icon: "mobile" },
    { id: "design", label: "Design", icon: "design" },
    { id: "slides", label: "Slides", icon: "slides" },
    { id: "animation", label: "Animation", icon: "animation" },
    { id: "data", label: "Data Visualization", icon: "data" },
    { id: "game", label: "3D Game", icon: "game" },
    { id: "document", label: "Document", icon: "document" },
    { id: "spreadsheet", label: "Spreadsheet", icon: "spreadsheet" },
];

export const examplePromptSets: ExamplePrompt[][] = [
    [
        {
            label: "Beginner Running Tracker",
            text: "A Fitness Tracking App For Beginner Runners That Logs Workouts, Tracks Distance And Time, And Shows Monthly Progress",
        },
        {
            label: "Fitness App Onboarding Wireframe",
            text: "A Wireframe For The Onboarding Flow Of A Personal Fitness Tracking App That Introduces Features Like Workout Logging, Goal Setting, And Progress Tracking",
        },
        {
            label: "Checkout Flow Prototype",
            text: "A Clickable Checkout Flow Prototype For An E-Commerce Clothing Store To Test The Purchase Experience With Users",
        },
    ],
    [
        {
            label: "B2B Project Management App",
            text: "A Project Management Web App For A Small B2B SaaS Startup Team To Track Tasks, Assign Owners, Set Deadlines, And View Progress Across Projects",
        },
        {
            label: "Freelance Client Portal",
            text: "A Client Portal For A Freelance Design Business Where Customers Can Submit Requests, Upload Files, And Track The Status Of Their Projects",
        },
        {
            label: "AI Sales Assistant",
            text: "An AI Sales Assistant Web App For A Small SaaS Company That Drafts And Sends Personalized Outreach Emails To Potential Customers",
        },
    ],
    [
        {
            label: "SaaS Hero Animation",
            text: "A Simple Looping Hero Animation For A SaaS Website Homepage That Shows Team Members Collaborating On Shared Tasks",
        },
        {
            label: "Startup Pitch Explainer",
            text: "An Animated Explainer Video For A Startup Pitch Illustrating The Problem And The Product Solution",
        },
        {
            label: "SaaS KPI Dashboard",
            text: "A SaaS KPI Dashboard Showing User Growth, Churn Rate, And Retention Trends Over Time",
        },
    ],
];

export const heroTaglines = [
    "Turn Ideas Into Apps In Minutes — No Coding Needed",
    "You Can Always Make Changes Later.",
    "Your First Prompt Is Free. No Credit Consumption.",
];

const AVATAR_BASE =
    "https://replit.com/cdn-cgi/image/width=256,quality=80,format=auto/public/images/lox/social-proof";

export const agentFeatures: AgentFeature[] = [
    {
        id: "canvas",
        eyebrow: "Infinite Canvas",
        title: "Design Freely",
        description:
            "Introducing A New Space That Allows You To Explore And Tweak Designs Visually, And Then Apply Them Directly To Your App.",
        variant: "canvas",
    },
    {
        id: "parallel",
        eyebrow: "Parallel Agents",
        title: "Move Faster",
        description:
            "Parallel Agents Run Tasks Together, Keeping Progress Visible. Handle Auth, Database, And Design Seamlessly.",
        variant: "parallel",
    },
    {
        id: "artifacts",
        eyebrow: "Multiple Artifacts",
        title: "Ship Anything",
        description:
            "Create Mobile And Web Apps, Landing Pages, And Videos In One Project With Shared Design. Build Everything As Your Project Scales Without Context Switching.",
        variant: "artifacts",
    },
    {
        id: "teams",
        eyebrow: "Support For Teams",
        title: "Build Together",
        description:
            "Your Team Can Focus On Planning Your App While The Agent Handles All The Messy Coordination And Execution. Submit Requests In Any Order, And Agent 4 Intelligently Sequences Them And Executes In The Best Order.",
        variant: "teams",
    },
];

export const platformFeatures: PlatformFeature[] = [
    {
        id: "agent",
        eyebrow: "Agent Chat",
        title: "Describe It. Publish It.",
        description:
            "Describe And Publish Your Project. The Agent Writes Production-Ready Code, Evolves It, And Stays Out Of Your Way.",
        variant: "agent",
    },
    {
        id: "infrastructure",
        eyebrow: "Full Stack Infrastructure",
        title: "Build & Scale Your Apps Easily.",
        description:
            "Built-In Services With Zero Setup- Authentication, Database, Hosting, And Monitoring, Enabling You To Build Fully Scalable Apps Easily And Securely From Day One.",
        variant: "infrastructure",
    },
    {
        id: "integrations",
        eyebrow: "Integrations",
        title: "Connect To AI & Services.",
        description:
            "Enhance Your Apps With AI And 100+ Integrations. Connect To OpenAI, Stripe, Google Workspace, And More In Minutes.",
        variant: "integrations",
    },
    {
        id: "enterprise",
        eyebrow: "Enterprise Control",
        title: "Secure Your Apps As They Scale.",
        description:
            "Security Controls: SSO/SAML, SOC 2, And Admin Controls. Screening And Secure Services Keep Apps Safe.",
        variant: "enterprise",
    },
];

export const testimonials: Testimonial[] = [
    {
        id: "databricks",
        quote: "By Integrating With Lakebase And Databricks Apps, We're Combining Replit's Capabilities With Trusted Enterprise Data And Governance, Helping Teams Move From Idea To Production Faster And More Securely Than Ever.",
        author: "Ali Ghodsi",
        role: "CEO",
        company: "Databricks",
        avatarUrl: `${AVATAR_BASE}/Ali%20Ghodsi.jpg`,
    },
    {
        id: "zillow",
        quote: "Agent 4 Unlocks True Collaboration And Real-Time Learning — Now Our Teams Can Design And Build With Our Closest Partners Live, Turn Instant Feedback Into Measurable Wins, And Deliver Outcomes That Delight Customers And Partners.",
        author: "Doug Rodermund",
        role: "Principal Program Manager",
        company: "Zillow",
        avatarUrl: `${AVATAR_BASE}/Doug%20Roderman.png`,
    },
    {
        id: "gusto",
        quote: "Replit Agent 4 Is Incredible. Its Ability To Take A One-Shot Prompt And Flesh Out The Requirements Before A Full Build Is Unmatched. It Requires Very Little Guidance To Take A Rough Concept To A Functional Prototype.",
        author: "Alex Meyers",
        role: "Principal Product Manager",
        company: "Gusto",
        avatarUrl: `${AVATAR_BASE}/Alex%20Meyers.png`,
    },
    {
        id: "payouts",
        quote: "The Parallel Task Execution Is A Game-Changer For Us. We Have Multiple Builders Working On The Same Codebase Every Day, And The Ability To Submit Tasks Simultaneously With Full Visibility Before Anything Merges Is Exactly How We've Wanted To Work.",
        author: "Barak Hirchson",
        role: "Co-Founder & Chief AI Officer",
        company: "Payouts.com",
        avatarUrl: `${AVATAR_BASE}/Barak%20Hirchson.png`,
    },
    {
        id: "talkdesk",
        quote: "To Deliver The World's Best Customer Experience, Our Internal Teams Need To Work Without Limits. Replit Gives Our Teams The 'Superpowers' To Prototype And Scale Internal Solutions In Hours Rather Than Weeks.",
        author: "Shauna Geraghty",
        role: "SVP, Global People And Talent",
        company: "Talkdesk",
        avatarUrl: `${AVATAR_BASE}/Shauna%20Geraghty.png`,
    },
    {
        id: "smfl",
        quote: "Agent 4 Is A Game-Changer. Multi-User Vibe Coding Via The Kanban Is A Significant Milestone For Enterprises. It's Great For Turning Individual Concepts Into Team Realities And Managing Tasks Through Diverse Role Definitions.",
        author: "Takeshi Fujiwara",
        role: "Director",
        company: "SMFL Digital Lab",
        avatarUrl: `${AVATAR_BASE}/Takeshi%20Fujiwara.png`,
    },
];

export const pricingPlans: PricingPlan[] = [
    {
        id: "starter",
        name: "Starter",
        description: "For Exploring What's Possible",
        monthlyPrice: 0,
        yearlyPrice: 0,
        ctaLabel: "Sign Up",
        ctaHref: "/signup",
        features: [
            "Free Daily Agent Credits",
            "Built-In Database For Full-Stack Apps",
            "Create Slides, Videos, Animations",
            "Publish Up To 1 Project",
            "Publish Private Or Password-Protected Deployments",
        ],
    },
    {
        id: "core",
        name: "Replit Core",
        description: "For Personal Projects & Simple Apps",
        monthlyPrice: 25,
        yearlyPrice: 18,
        ctaLabel: "Join Replit Core",
        ctaHref: "/app/billing",
        features: [
            "Everything In Starter",
            "$20 Of Monthly Credits",
            "Invite Up To 5 Collaborators",
            "Work In Parallel With Up To 2 Agents",
            "Publish Projects In Any Region",
            "Unlimited Workspaces",
            'Remove "Made With Replit" Badge',
            "Replit AI Integrations",
        ],
    },
    {
        id: "pro",
        name: "Replit Pro",
        description: "For Commercial And Professional Builds",
        monthlyPrice: 25,
        yearlyPrice: 23,
        originalPrice: 25,
        ctaLabel: "Upgrade To Pro",
        ctaHref: "/app/billing",
        features: [
            "Everything In Core",
            "$100 Monthly Credits",
            "Invite Up To 15 Collaborators",
            "Invite Up To 50 Viewers",
            "Work In Parallel With Up To 10 Agents",
            "Access To The Most Powerful Models",
            "Database Rollbacks For Up To 28 Days",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For Enterprise-Grade Security & Controls",
        monthlyPrice: null,
        yearlyPrice: null,
        ctaLabel: "Contact Sales",
        ctaHref: "/contact-sales",
        features: [
            "Everything In Pro",
            "Custom Seat Limits",
            "SSO / SAML",
            "Advanced Privacy Controls",
            "Design System Support",
            "Single-Tenant Environments",
            "Static Outbound IPs",
            "VPC Peering",
        ],
    },
];

/** Pro seat tiers for the pricing dropdown. */
export const proSeatTiers = [
    { seats: 100, monthly: 100, yearly: 90 },
    { seats: 300, monthly: 300, yearly: 278 },
    { seats: 500, monthly: 500, yearly: 463 },
    { seats: 1000, monthly: 1000, yearly: 900 },
    { seats: 2500, monthly: 2500, yearly: 2125 },
    { seats: 4000, monthly: 4000, yearly: 3200 },
];

export const footerColumns: NavGroup[] = [
    {
        title: "Handy Links",
        links: [
            { label: "Vibe Coding 101", href: "/vibe-coding" },
            { label: "How To Guides", href: "/guides" },
            { label: "Import From GitHub", href: "/import" },
            { label: "Help", href: "/help" },
            { label: "Status", href: "/status" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Brand", href: "/brand" },
            { label: "Certifications", href: "/certifications" },
            { label: "Careers", href: "/careers" },
            { label: "Partnerships", href: "/partnerships" },
            { label: "Education", href: "/education" },
            { label: "Startups", href: "/startups" },
            { label: "Race To Revenue", href: "/race-to-revenue" },
            { label: "Additional Resources", href: "/resources" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms Of Service", href: "/terms" },
            { label: "Commercial Agreement", href: "/commercial" },
            { label: "Privacy", href: "/privacy" },
            { label: "Subprocessors", href: "/subprocessors" },
            { label: "DPA", href: "/dpa" },
            { label: "Report Abuse", href: "/report" },
        ],
    },
    {
        title: "Connect",
        links: [
            { label: "X / Twitter", href: "https://twitter.com/replit" },
            { label: "TikTok", href: "https://tiktok.com/@replit" },
            { label: "Facebook", href: "https://facebook.com/replit" },
            { label: "Instagram", href: "https://instagram.com/replit" },
            { label: "LinkedIn", href: "https://linkedin.com/company/replit" },
        ],
    },
];

// ==============================================================================================================
const skills = {
  "C#": "/skills/cs-logo.png",
  "Meta XR SDK": "/skills/meta-xr-sdk-logo.png",
  Unity: "/skills/unity-logo.png",
  React: "/skills/react-logo.png",
  NextJS: "/skills/nextjs-logo.png",
  TypeScript: "/skills/typescript-logo.png",
  Tailwind: "/skills/tailwind-logo.png",
  MySQL: "/skills/mysql-logo.png",
  Jira: "/skills/jira-logo.png",
  Figma: "/skills/figma-logo.png",
  Expo: "/skills/expo-logo.png",
  PostgreSQL: "/skills/postgre-logo.png",
  SupaBase: "/skills/supabase-logo.png",
  HTML: "/skills/html-logo.png",
  CSS: "/skills/css-logo.png",
  JavaScript: "/skills/javascript-logo.png",
  "Node.js": "/skills/node.js-logo.png",
  Vite: "/skills/vite-logo.png",
};

// Throws on an unknown skill so a typo fails the build instead of rendering a broken logo.
function stack(...names) {
  return names.map((name) => {
    if (!skills[name]) throw new Error(`Unknown skill "${name}" in catalogue.js`);
    return { name, image: skills[name] };
  });
}

// ==============================================================================================================
export const featuredProject = {
  title: "IDEA Mixed Reality Room Planner",
  subtitle: "Mixed Reality Application",
  blurb:
    "Mixed reality app that lets users to visualize and plan out their living spaces with life-sized 3D furniture models, in real time.",
  links: [
    {
      title: "GitHub",
      url: "https://github.com/alejandrocqvd/IDEA-MR-Room-Planner",
    },
  ],
  images: [
    "/work/idea-mr-room-planner-demo.mp4",
    "/work/idea-mr-room-planner-img-2.jpg",
    "/work/idea-mr-room-planner-img-3.jpg",
    "/work/idea-mr-room-planner-img-4.jpg",
  ],
  header: "What is it?",
  description: `Developed a mixed reality app that allows users to visualize and plan out their living spaces with life-sized 3D furniture models, in real time.

                The app features hand tracking, giving users the freedom to grab, move, and arrange over 100+ pieces of distinct furniture pieces as they would naturally.

                  I've always been hugely interested in VR and MR, and once I got my hands on a Quest 3, I knew I had to do something with it (aside from playing games on it).
                  `,
  techStack: stack("C#", "Meta XR SDK", "Unity"),
};

// ==============================================================================================================
export const projects = {
  nullus: {
    title: "Nullus",
    subtitle: "Software Development Company",
    thumbnail: "/work/nullus-img.png",
    links: [{ title: "Website", url: "https://www.nullus.ca/" }],
    images: [
      "/work/nullus-img.png",
      "/work/nullus-img-2.png",
      "/work/nullus-img-3.png",
    ],
    header: "What is Nullus?",
    description: `I co-founded Nullus, a software development company focused on empowering individuals, clubs, and businesses with innovative web solutions, while providing students valuable experience in a collaborative team environment.

                  We've served over 6+ clients and have been recognized as being one of the top website development companies in Calgary, by DesignRush.com.
                  `,
    techStack: stack("React", "NextJS", "TypeScript", "Tailwind", "MySQL", "Jira", "Figma"),
  },
  urbanSignal: {
    title: "Urban Signal",
    subtitle: "Cross-Platform 311 App",
    thumbnail: "/work/urban-signal-img.png",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/alejandrocqvd/hack-the-change-2025-mobile",
      },
    ],
    images: [
      "/work/urban-signal-demo.mp4",
      "/work/urban-signal-img-2.png",
      "/work/urban-signal-img.png",
      "/work/urban-signal-img-3.png",
    ],
    header: "What is Urban Signal?",
    description: `For HackTheChange 2025, our team developed Urban Signal, a cross-platform application designed to streamline the reporting of 311 related issues in the city of Calgary.

                Users can snap a photo on the mobile app, and with automatic location tagging and status tracking, they can easily report issues like potholes or graffiti. City workers can then efficiently manage and resolve these reports through the web dashboard that visualizes reports through heat maps, live issue feeds, and AI driven queries to prioritize neglected communities.
                `,
    techStack: stack("Expo", "NextJS", "TypeScript", "Tailwind", "PostgreSQL", "SupaBase"),
  },
  malwareTerminal: {
    title: "Malware Terminal",
    subtitle: "Educational Cybersecurity Game",
    thumbnail: "/work/malware-terminal-img.PNG",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/your-username/malware-terminal",
      },
      {
        title: "Website",
        url: "https://alejandrocqvd.github.io/CPSC-329-Terminal/",
      },
    ],
    images: [
      "/work/malware-terminal-img.PNG",
      "/work/malware-terminal-img-2.png",
      "/work/malware-terminal-img-3.png",
    ],
    header: "What is Malware Terminal?",
    description: `For my cybersecurity class, I came up with an idea for my group to design and develop an interactive terminal-like website to educate those interested in everything there is about malware.

                The main purpose of the site was education, but if the users are brave enough, they can download a suspicious package on the terminal and see how it affects their system.`,
    techStack: stack("HTML", "CSS", "JavaScript"),
  },
  dinodb: {
    title: "DinoDB",
    subtitle: "Full-Stack Database Web App",
    thumbnail: "/work/dinodb-img.PNG",
    links: [{ title: "GitHub", url: "https://github.com/e-woo/dinodb" }],
    images: [
      "/work/dinodb-demo.mp4",
      "/work/dinodb-img.PNG",
      "/work/dinodb-img-2.png",
      "/work/dinodb-img-3.png",
    ],
    header: "What is DinoDB?",
    description: `For my DBMS class, we were tasked with planning out, designing, and developing a web application. Although PHP was recommended for the frontend, but we wanted to broaden our skills by utilizing modern web technologies.

                Our project goals included learning React, TypeScript, and TailwindCSS to create a dynamic and responsive user interface. After we were done with our project and presented it to our TA, they told us that it was the best project they had reviewed for this term.
                `,
    techStack: stack("React", "TypeScript", "Tailwind", "Node.js", "MySQL"),
  },
  sortingVisualizer: {
    title: "Sorting Visualizer",
    subtitle: "Interactive Algorithm Visualizer",
    thumbnail: "/work/sorting-visualizer-img.PNG",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/alejandrocqvd/Sorting-Algorithm-Visualizer",
      },
      {
        title: "Website",
        url: "https://alejandrocqvd.github.io/Sorting-Algorithm-Visualizer/",
      },
    ],
    images: ["/work/sorting-visualizer-img.PNG"],
    header: "What is Sorting Visualizer?",
    description: `The goal of designing the visualizer was to learn each sorting algorithm in depth and solidify JavaScript skills by developing an interactive web app where users can see the process of each sorting algorithm, step-by-step.

                Includes algorithms from bubble-sort to quick-sort, and of course, bogo-sort.`,
    techStack: stack("HTML", "CSS", "JavaScript"),
  },
  mihistoria: {
    title: "MiHistoria",
    subtitle: "Social Media Web App",
    thumbnail: "/work/mihistoria-img.PNG",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/alejandrocqvd/MiHistoria",
      },
      {
        title: "Website",
        url: "https://mihistoria.vercel.app/",
      },
    ],
    images: [
      "/work/mihistoria-demo.mp4",
      "/work/mihistoria-img-2.png",
      "/work/mihistoria-img-3.png",
      "/work/mihistoria-img-4.png",
      "/work/mihistoria-img-5.png",
    ],
    header: "What is MiHistoria?",
    description: `MiHistoria is a social media web application where each user is given one chance to share their entire life story in a single post. Here, users can use TinyMCE's rich text editor to write and format their stories.

                After DinoDB, I focused on sharpening my modern web dev skills by building RESTful APIs for full server-client interaction, including CRUD, authentication, and data handling.`,
    techStack: stack("React", "Vite", "TypeScript", "Tailwind", "Node.js", "MySQL"),
  },
};

// ==============================================================================================================
// Bento-grid layout: each card points at a project by id.
export const projectCards = {
  top: {
    large: { id: "nullus", side: "left", fade: "fade-in-1" },
    small: [
      { id: "urbanSignal", side: "right", fade: "fade-in-2" },
      { id: "malwareTerminal", side: "right", fade: "fade-in-3" },
    ],
  },
  bottom: {
    small: [
      { id: "dinodb", side: "left", fade: "fade-in-4" },
      { id: "sortingVisualizer", side: "left", fade: "fade-in-5" },
    ],
    large: { id: "mihistoria", side: "right", fade: "fade-in-6" },
  },
};

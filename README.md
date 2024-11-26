# Personal Portfolio

A modern and fully responsive personal portfolio template built with [Next.js 13](https://nextjs.org/), featuring advanced animations, secure email functionality, and seamless performance across devices.

## Features

- **Latest Next.js 13 Features**: Leverages App Router, Server Actions, and Client/Server Components.
- **TypeScript Integration**: Ensures type safety and maintainability.
- **Tailwind CSS**: For modern and responsive UI design with light/dark mode support.
- **Framer Motion**: Adds smooth animations and transitions for enhanced user engagement.
- **Email API Integration**: Secure email functionality using [React.Email](https://react.email/) and [Resend](https://resend.com/) with robust form validation.
- **Custom React Hooks**: For efficient state management and modularity.
- **100% Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Performance Optimizations**: Achieves a Lighthouse performance score of 95+ and an average load time of <100ms.

## Getting Started

To get started with the project locally:

### Prerequisites

- Node.js version 18 or later
- Package manager of your choice (npm, yarn, or pnpm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

### Building for Production

To build the project for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Testing the Project

Run the project locally to test responsiveness, performance, and features:

1. **Email Functionality**: Fill out the contact form to test email delivery via the Resend API.
2. **Responsive Design**: Test the UI on different devices and screen sizes.
3. **Light/Dark Mode**: Toggle between themes to ensure proper styling.

## Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx    # Layout component
│   ├── page.tsx      # Main page component
├── components/       # Reusable UI components
├── styles/           # Global styles and Tailwind CSS configuration
├── public/           # Static assets (e.g., images)
├── lib/              # Custom hooks and utility functions
├── email/            # Email templates for React.Email
└── package.json      # Project configuration
```

## Technologies Used

- **Next.js 13**: Framework for server-side rendering and static site generation.
- **TypeScript**: Type-safe programming.
- **Tailwind CSS**: Utility-first CSS framework.
- **Framer Motion**: Library for animations.
- **React.Email**: Email template rendering.
- **Resend**: Email delivery API.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the project.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Feel free to customize and adapt this template for your own use!


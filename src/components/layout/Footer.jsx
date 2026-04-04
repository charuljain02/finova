export function Footer() {
  return (
    <footer className="mt-10 py-6 text-center text-sm 
      text-gray-500 dark:text-gray-400 border-t 
      border-gray-200 dark:border-gray-800"
    >
      <p>
        © {new Date().getFullYear()} Zorvyn Finance • Built by Charul Jain
      </p>
    </footer>
  );
}
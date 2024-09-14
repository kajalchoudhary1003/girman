import { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useRouter } from 'next/router';

export default function SearchResults() {

    const router = useRouter();
    const { query } = router.query;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
     // If query is undefined or empty, do not fetch
     if (!query) {
        setLoading(false);
        setUsers([]);
        return;
      }
    const fetchUsers = async () => {
        try {
            
            console.log("Fetching users with query:", query);
            const res = await fetch(`/api/users?query=${encodeURIComponent(query)}`);
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setUsers(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching users:", error);
            setError(true);
            setLoading(false);
          }
    };
    fetchUsers();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error || users.length === 0) return <p>No results found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard key={user.contact_number} user={user} />
      ))}
    </div>
  );
}

function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 border">
     
      <h2>{user.first_name} {user.last_name}</h2>
      <p>{user.city}</p>
      <button onClick={() => setIsOpen(true)}>Fetch Details</button>

      {/* Use Shadcn Dialog Component */}
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div>
            <h2>{user.first_name} {user.last_name}</h2>
            <p>City: {user.city}</p>
            <p>Phone: {user.contact_number}</p>
          </div>
        </Dialog>
      )}
    </div>
  );
}

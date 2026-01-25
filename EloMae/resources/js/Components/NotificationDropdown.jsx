export default function NotificationDropdown({ notifications }) {
  return (
    <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg">
      <ul>
        {notifications.length === 0 && (
          <li className="p-4 text-sm text-gray-500">
            Nenhuma notificação
          </li>
        )}

        {notifications.map(notification => (
          <li
            key={notification.id}
            className={`p-4 border-b ${
              !notification.read_at ? "bg-gray-50 font-medium" : ""
            }`}
          >
            <p>{notification.message}</p>
            <span className="text-xs text-gray-400">
              {notification.created_at}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

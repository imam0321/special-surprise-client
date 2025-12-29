import UserAvatar from "../UserAvatar";

interface UserInfoCellProps {
  name: string;
  email: string;
  photo?: string | null;
}

export function UserInfoCell({ name, email, photo }: UserInfoCellProps) {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar name={name} image={photo} size="sm" />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}

export default async function MessagesPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/30 h-full">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Select a conversation</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a friend from the list to start chatting
        </p>
      </div>
    </div>
  );
}

import { FormEvent, useState } from "react";

type CommentFormProps<T> = {
  loading: boolean;
  error: string | undefined;
  autoFocus?: boolean;
  onSubmit: (data: string) => Promise<T>;
  initialValue?: string;
};

export default function CommentForm<T>({
  loading,
  error,
  autoFocus = false,
  onSubmit,
  initialValue = "",
}: CommentFormProps<T>) {
  const [message, setMessage] = useState<string>(initialValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(""));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button className="btn" disabled={loading} type="submit">
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}

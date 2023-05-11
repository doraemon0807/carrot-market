import Chatbox from "@/components/chatbox";
import Layout from "@/components/layout";
import ChatMessage from "@/components/chat-message";
import useMutation from "@/libs/client/useMutation";
import { Message, Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { UserProp } from "@/components/auth";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
  isOwner: boolean;
}

interface MessageForm {
  message: string;
}

interface MessageResponse {
  ok: boolean;
  message: Message;
}

export default function StreamDetail({ user }: UserProp) {
  const router = useRouter();

  //API to grab stream info (also grabs all messages from live chat)
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    { refreshInterval: 1000 }
  );

  //bring user to error page if stream doesn't exist
  // useEffect(() => {
  //   if (data && !data?.ok) router.push("/404");
  // }, [data, router]);

  const { register, handleSubmit, reset } = useForm<MessageForm>();

  //API to send messages to db
  const [sendMessage, { data: sendMessageData, loading: sendMessageLoading }] =
    useMutation<MessageResponse>(`/api/streams/${router.query.id}/message`);

  const onValid = (form: MessageForm) => {
    if (sendMessageLoading) return;
    reset();
    mutate(
      //fake real-time chat
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };

  return (
    <Layout title="Stream" canGoBack seoTitle="Stream Detail">
      <div className="space-y-4 px-4">
        {data?.stream.cloudflareId ? (
          <iframe
            className="aspect-video w-full rounded-md bg-slate-300 shadow-sm"
            src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>
        ) : null}

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream.name}
          </h1>
          <h3 className="text-md mt-1 font-medium text-gray-600">
            {data?.stream.brand}
          </h3>
          <span className="mt-3 block text-3xl text-gray-900">
            ${data?.stream.price}
          </span>
          <p className="my-6 text-gray-700">{data?.stream.description}</p>
          {data?.isOwner ? (
            <div className="my-10 space-y-1 text-gray-900">
              <h4 className="text-lg font-medium">Stream keys (secret)</h4>
              <div className="flex flex-col space-y-1">
                <h5 className="text-sm font-medium text-gray-900">
                  Stream URL
                </h5>
                <div className="flex truncate rounded-sm border border-gray-300 bg-gray-100 p-2 text-xs text-gray-600">
                  {data?.stream.cloudflareUrl}
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <h5 className="text-sm font-medium text-gray-900">
                  Stream Key
                </h5>
                <div className="flex truncate rounded-sm border border-gray-300 bg-gray-100 p-2 text-xs text-gray-600">
                  {data?.stream.cloudflareKey}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>

        <div className="h-[50vh] space-y-4 overflow-y-scroll rounded-lg border border-gray-100 bg-blue-50 px-4 py-6 scrollbar-hide">
          {data?.stream?.messages?.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              reverted={message.user.id !== user?.id}
              avatarUrl={message.user.avatar}
              senderId={message.user.id}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit(onValid)}>
          <Chatbox register={register("message", { required: true })} />
        </form>
      </div>
    </Layout>
  );
}

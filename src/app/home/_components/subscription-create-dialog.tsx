"use client";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubscriptionSchema,
  defaultSubscriptionValues,
  subscriptionSchema,
} from "@/lib/validations/subscriptions";
import { trpc } from "@/trpc/trpcClient";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { IScrapedUrlResponse, exampleChatResponse } from "@/lib/prompts";
import { ContentPreviewCarousel } from "./ContentPreviewCarousel";
import Spinner from "@/components/ui/Spinner";

interface SubscriptionCreateDialogProps extends ButtonProps {}
export function SubscriptionCreateDialog({
  variant,
  className,
}: SubscriptionCreateDialogProps) {
  const [isCrawlable, setIsCrawlable] = useState(false);
  const [previewContent, setPreviewContent] =
    useState<IScrapedUrlResponse | null>(exampleChatResponse);
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: defaultSubscriptionValues,
  });

  // const { data } = trpc.subscription.hello.useQuery({ text: "asdf" });

  const { mutate: checkUrl, isLoading: isChecking } =
    trpc.subscription.checkIfUrlIsAllowedToBeCrawled.useMutation({
      onSuccess: (x) => {
        console.log(x);

        if (x.errorMessage) {
          toast({
            title: "Oops!",
            description: x.errorMessage,
            action: <ToastAction altText="accept">Ok</ToastAction>,
            duration: 2000,
          });
        }
        setIsCrawlable(x.isCrawlable);
      },
    });

  const { mutate: storeUrl, isLoading: isStoringUrl } =
    trpc.subscription.storeUrlSubscription.useMutation({
      onSuccess: (x) => {
        // setIsCrawlable(x);
      },
    });
  const onSubmit = (data: SubscriptionSchema) => {
    checkUrl(data);
  };

  const isLoading = isChecking || isStoringUrl;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            buttonVariants({ variant }),
            // {
            //   "cursor-not-allowed opacity-60": isLoading,
            // },
            className,
          )}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          New subscription
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogHeader>
            <DialogTitle>Add a new subscription</DialogTitle>
            <DialogDescription>
              Type in a new website url, we'll check it and if everything is ok
              we'll create a subscription and let you know whenever it changes
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-2">
            <div className="relative grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                {...register("url")}
                placeholder="https://"
                disabled={isLoading}
              />
              {errors?.url && (
                <p className="px-1 text-xs text-red-600">
                  {errors.url.message}
                </p>
              )}
            </div>
            {isLoading && (
              <div className="absolute right-10">
                <Spinner />
              </div>
            )}
          </div>
          {/* {previewContent?.list && ( */}
          {/*   <ContentPreviewCarousel items={previewContent?.list} /> */}
          {/* )} */}
          <DialogFooter className="gap-4 sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Check
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

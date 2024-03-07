import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IScrapedUrlResponseItem } from "@/lib/prompts";

export function ContentPreviewCarousel({
  items,
}: {
  items: IScrapedUrlResponseItem[];
}) {
  return (
    <div className="flex w-full ">
      <Carousel
        opts={
          {
            // align: "start",
          }
        }
        className="flex  "
      >
        <CarouselContent className="overflow-hidden">
          {items?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                    <img src={item.imageUrl} alt={item.title} />
                    <h5 className=" font-semibold">{item.title}</h5>
                    <h6 className="font-semibold">{item.summary}</h6>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>{" "}
    </div>
  );
}

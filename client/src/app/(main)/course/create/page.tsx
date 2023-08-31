"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import UploadFile from "@/components/core/UploadFile";
import { Switch } from "@/components/ui/switch";
import { DevTool } from "@hookform/devtools";
import { Trash2Icon } from "lucide-react";

// DNDKIT
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import MetaDataComponent from "@/components/core/MetaDataComponent";
import { SortableItem } from "@/components/core/SortableItem";
import SectionComponent from "@/components/core/SectionComponent";

const CourseCreate = () => {
  const metaDataSchema = z.object({
    key: z.string(),
    value: z.string(),
  });

  const lessonSchema = z.object({
    title: z.string().min(5).max(100),
    description: z.string(),
    lessonType: z.enum(["video", "pdf", "document"]),
    videoUrl: z.string(),
    pdfUrl: z.string(),
    documentUrl: z.string(),
    thumbnailUrl: z.string(),
    resources: z.array(z.string()),
    assignments: z.array(z.string()),
  });

  const sectionSchema = z.object({
    title: z.string().min(5).max(100),
    description: z.string(),
    // lessons: z.array(lessonSchema),
  });

  const courseCreateSchema = z.object({
    title: z.string().min(5).max(100),
    titleSlug: z.string().transform(value => slugify(value)),
    description: z.string(),
    price: z.object({
      IN: z.number(),
      US: z.number(),
      discount: z.number().min(0).max(100).default(0),
      isFree: z.boolean().default(false),
    }),
    metaData: z.array(metaDataSchema),
    sections: z.array(sectionSchema),
  });

  const form = useForm<z.infer<typeof courseCreateSchema>>({
    resolver: zodResolver(courseCreateSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = form;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "metaData",
    }
  );

  const sectionsField = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = (data: z.infer<typeof courseCreateSchema>) => {
    console.log(data);
  };

  return (
    <>
      <div>CourseCreate</div>
      {/* <DevTool control={control} /> */}

      <section className="max-w-2xl mx-auto">
        <Form {...form}>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <Label htmlFor="title" className="text-lg font-semibold">
                Title
              </Label>
              <Input type="text" id="title" {...register("title")} />
            </FormItem>
            <FormItem>
              <Label htmlFor="titleSlug" className="text-lg font-semibold">
                Title Slug
              </Label>
              <Input type="text" id="titleSlug" {...register("titleSlug")} />
            </FormItem>
            <FormItem>
              <Label htmlFor="description" className="text-lg font-semibold">
                Description
              </Label>
              <Textarea id="description" {...register("description")} />
            </FormItem>
            <FormItem>
              <Label htmlFor="thumbnail" className="text-lg font-semibold">
                Thumbnail
              </Label>
              <UploadFile />
            </FormItem>

            <div className="border rounded-md px-3 py-2">
              <Label htmlFor="pricing" className="text-lg font-semibold">
                Pricing
              </Label>
              <div className="flex gap-2">
                <FormItem>
                  <Label htmlFor="price">India Price</Label>
                  <Input
                    type="number"
                    id="price.IN"
                    {...register("price.IN", {
                      valueAsNumber: true,
                    })}
                  />
                </FormItem>
                <FormItem>
                  <Label htmlFor="price">US Price</Label>
                  <Input
                    type="number"
                    id="price.US"
                    {...register("price.US", {
                      valueAsNumber: true,
                    })}
                  />
                </FormItem>
                <FormItem>
                  <Label htmlFor="discount">Discount %</Label>
                  <Input
                    type="number"
                    id="price.discount"
                    max={100}
                    min={0}
                    {...register("price.discount", {
                      valueAsNumber: true,
                    })}
                  />
                </FormItem>
                <FormField
                  name="price.isFree"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Free Course?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border rounded-md px-3 py-2">
              <Label htmlFor="metaData" className="text-lg font-semibold">
                Meta Data
              </Label>
              <div className="mb-3">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={event => {
                    const { active, over } = event;

                    if (active.id !== over?.id) {
                      if (over?.id)
                        return move(
                          active.data.current?.sortable?.index,
                          over.data.current?.sortable?.index
                        );
                    }
                  }}
                >
                  <SortableContext
                    items={fields}
                    strategy={verticalListSortingStrategy}
                  >
                    {fields.map((field, i) => {
                      return (
                        <SortableItem key={field.id} id={field.id}>
                          <MetaDataComponent
                            field={field}
                            i={i}
                            register={register}
                            remove={remove}
                          />
                        </SortableItem>
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </div>

              <Button
                type="button"
                onClick={() => append({ key: "", value: "" })}
              >
                + Add
              </Button>
            </div>

            <div className="border rounded-md px-3 py-2">
              <Label htmlFor="sections" className="text-lg font-semibold">
                Sections
              </Label>
              <div className="mb-3">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={event => {
                    const { active, over } = event;

                    if (active.id !== over?.id) {
                      if (over?.id)
                        return sectionsField.move(
                          active.data.current?.sortable?.index,
                          over.data.current?.sortable?.index
                        );
                    }
                  }}
                >
                  <SortableContext
                    items={sectionsField.fields}
                    strategy={verticalListSortingStrategy}
                  >
                    {sectionsField.fields.map((field, i) => {
                      return (
                        <SortableItem key={field.id} id={field.id}>
                          <SectionComponent
                            field={field}
                            i={i}
                            register={register}
                            remove={sectionsField.remove}
                          />
                        </SortableItem>
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </div>

              <Button
                type="button"
                onClick={() =>
                  sectionsField.append({ title: "", description: "" })
                }
              >
                + Add Section
              </Button>
            </div>

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default CourseCreate;

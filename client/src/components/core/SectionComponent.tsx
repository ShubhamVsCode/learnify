import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

const SectionComponent = ({
  field,
  i,
  register,
  remove,
}: {
  field: any;
  i: number;
  register: any;
  remove: any;
}) => {
  return (
    <div key={field.id} className="grid gap-3 items-end relative group">
      <FormItem className="">
        <Label htmlFor={`section.${i}.title`}>Title</Label>
        <Input
          type="text"
          id={`section.${i}.title`}
          {...register(`section.${i}.title`)}
        />
      </FormItem>
      <FormItem className="">
        <Label htmlFor={`section.${i}.description`}>Description</Label>
        <Input
          type="text"
          id={`section.${i}.description`}
          {...register(`section.${i}.description`)}
        />
      </FormItem>
      <Button
        type="button"
        variant={"destructive"}
        className="w-fit"
        onClick={() => remove(i)}
      >
        <Trash2Icon />
        &nbsp;Delete Section
      </Button>
    </div>
  );
};

export default SectionComponent;

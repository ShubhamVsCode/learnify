import React from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

const MetaDataComponent = ({
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
    <div key={field.id} className="flex gap-3 items-end">
      <FormItem className="flex-1">
        <Label htmlFor={`metaData.${i}.key`}>Key</Label>
        <Input
          type="text"
          id={`metaData.${i}.key`}
          {...register(`metaData.${i}.key`)}
        />
      </FormItem>
      <FormItem className="flex-1">
        <Label htmlFor={`metaData.${i}.value`}>Value</Label>
        <Input
          type="text"
          id={`metaData.${i}.value`}
          {...register(`metaData.${i}.value`)}
        />
      </FormItem>
      <Button type="button" variant={"destructive"} onClick={() => remove(i)}>
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default MetaDataComponent;

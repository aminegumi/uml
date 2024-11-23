import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EnumValue {
  id: number;
  name: string;
  type: string;
}

interface EnumAttributes {
  name: string;
  values: EnumValue[];
}

interface EnumerationEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (enumData: EnumAttributes) => void;
  initialData?: EnumAttributes;
}

const dataTypes = ["string", "int", "float", "double", "bool"];

const EnumerationEditorDialog: React.FC<EnumerationEditorDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [enumData, setEnumData] = useState<EnumAttributes>(
    initialData || { name: "", values: [] }
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnumData({ ...enumData, name: e.target.value });
  };

  const handleEnumValueChange = (
    index: number,
    field: "name" | "type",
    value: string
  ) => {
    const values = [...enumData.values];
    values[index][field] = value;
    setEnumData({ ...enumData, values });
  };

  const addEnumValue = () => {
    setEnumData({
      ...enumData,
      values: [
        ...enumData.values,
        {
          id: enumData.values.length,
          name: "",
          type: "string",
        },
      ],
    });
  };

  const removeEnumValue = (index: number) => {
    const values = [...enumData.values];
    values.splice(index, 1);
    setEnumData({ ...enumData, values });
  };

  const handleSubmit = () => {
    onSubmit(enumData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enumeration Editor</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enumeration Name */}
          <div className="space-y-2">
            <Label htmlFor="enumName">Enumeration Name</Label>
            <Input
              id="enumName"
              value={enumData.name}
              onChange={handleNameChange}
              placeholder="Enter enumeration name"
            />
          </div>

          {/* Enumeration Values */}
          <div className="space-y-2">
            <Label className="mr-8">Values</Label>
            {enumData.values.map((value, valueIndex) => (
              <div key={valueIndex} className="space-y-2 border p-2 rounded">
                <div className="flex items-center gap-2">
                  <Input
                    value={value.name}
                    onChange={(e) =>
                      handleEnumValueChange(valueIndex, "name", e.target.value)
                    }
                    placeholder="Enum value name"
                    className="flex-1"
                  />
                  <Select
                    value={value.type}
                    onValueChange={(valueType) =>
                      handleEnumValueChange(valueIndex, "type", valueType)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dataTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEnumValue(valueIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addEnumValue}
            >
              Add Value
            </Button>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnumerationEditorDialog;

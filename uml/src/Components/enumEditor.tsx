import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

interface Attribute {
  id: number;
  name: string;
  type: string;
  visibility: string;
}

interface EnumAttributes {
  label: "<<enumeration>>";
  name: string;
  attributes: Attribute[];
}

interface EnumEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (enumData: EnumAttributes) => void;
  initialData?: {
    name: string;
    attributes?: Array<{
      id: number;
      name: string;
      type: string;
      visibility: string;
    }>;
  };
}

const emptyEnumData: EnumAttributes = {
  label: "<<enumeration>>",
  name: "",
  attributes: [],
};

const dataTypes = ["string", "float", "int", "double", "bool", "date", "void"];

const EnumEditorDialog: React.FC<EnumEditorDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [enumData, setEnumData] = useState<EnumAttributes>(emptyEnumData);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setEnumData({
          label: "<<enumeration>>",
          name: initialData.name || "",
          attributes: (initialData.attributes || []).map((attr, index) => ({
            ...attr,
            id: index,
          })),
        });
      } else {
        setEnumData(emptyEnumData);
      }
    }
  }, [isOpen, initialData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnumData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleAttributeChange = (
    index: number,
    field: keyof Attribute,
    value: string
  ) => {
    setEnumData((prev) => {
      const attributes = [...prev.attributes];
      attributes[index] = { ...attributes[index], [field]: value };
      return { ...prev, attributes };
    });
  };

  const addAttribute = () => {
    setEnumData((prev) => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        {
          id: prev.attributes.length,
          name: "",
          type: "string",
          visibility: "public",
        },
      ],
    }));
  };

  const removeAttribute = (index: number) => {
    setEnumData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    onSubmit(enumData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Enumeration" : "Create New Enumeration"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enum Name */}
          <div className="space-y-2">
            <Label htmlFor="enumName">Enumeration Name</Label>
            <Input
              id="enumName"
              value={enumData.name}
              onChange={handleNameChange}
              placeholder="Enter enumeration name"
            />
          </div>

          {/* Attributes */}
          <div className="space-y-2">
            <Label className="mr-8">Attributes</Label>
            {enumData.attributes.map((attr, index) => (
              <div key={attr.id} className="flex items-center gap-2">
                <Input
                  value={attr.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                  placeholder="Attribute name"
                  className="flex-1"
                />
                <Select
                  value={attr.type}
                  onValueChange={(value) =>
                    handleAttributeChange(index, "type", value)
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
                  onClick={() => removeAttribute(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAttribute}
            >
              Add Attribute
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

export default EnumEditorDialog;

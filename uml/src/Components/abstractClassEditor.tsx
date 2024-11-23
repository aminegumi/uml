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

interface Method {
  id: number;
  name: string;
  properties: { name: string; type: string }[];
  returnType: string;
  visibility: string;
}

interface AbstractClassAttributes {
  label: "<<abstract>>";
  name: string;
  attributes: Attribute[];
  methods: Method[];
}

interface AbstractAbstracClassEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData: AbstractClassAttributes) => void;
  initialData?: {
    name?: string;
    attributes?: Array<{
      id: number;
      name: string;
      type: string;
      visibility: string;
    }>;
    methods?: Array<{
      id: number;
      name: string;
      properties: Array<{ name: string; type: string }>;
      returnType: string;
      visibility: string;
    }>;
  };
}

const emptyAbstractClassData: AbstractClassAttributes = {
  label: "<<abstract>>",
  name: "",
  attributes: [],
  methods: [],
};

const dataTypes = ["string", "float", "int", "double", "bool", "date", "void"];
const visibilityTypes = ["public", "private", "protected", "package"];

const AbstracClassEditorDialog: React.FC<AbstractAbstracClassEditorDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [classData, setClassData] = useState<AbstractClassAttributes>(
    emptyAbstractClassData
  );

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setClassData({
          label: "<<abstract>>",
          name: initialData.name || "",
          attributes: (initialData.attributes || []).map((attr, index) => ({
            ...attr,
            id: index,
          })),
          methods: (initialData.methods || []).map((method, index) => ({
            ...method,
            id: index,
          })),
        });
      } else {
        setClassData(emptyAbstractClassData);
      }
    }
  }, [isOpen, initialData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleAttributeChange = (
    index: number,
    field: keyof Attribute,
    value: string
  ) => {
    setClassData((prev) => {
      const attributes = [...prev.attributes];
      attributes[index] = { ...attributes[index], [field]: value };
      return { ...prev, attributes };
    });
  };

  const handleMethodChange = (
    methodIndex: number,
    field: keyof Method,
    value: string
  ) => {
    setClassData((prev) => {
      const methods = [...prev.methods];
      methods[methodIndex] = { ...methods[methodIndex], [field]: value };
      return { ...prev, methods };
    });
  };

  const handleMethodPropertyChange = (
    methodIndex: number,
    propertyIndex: number,
    field: "name" | "type",
    value: string
  ) => {
    setClassData((prev) => {
      const methods = [...prev.methods];
      methods[methodIndex] = {
        ...methods[methodIndex],
        properties: methods[methodIndex].properties.map((prop, idx) =>
          idx === propertyIndex ? { ...prop, [field]: value } : prop
        ),
      };
      return { ...prev, methods };
    });
  };

  const addAttribute = () => {
    setClassData((prev) => ({
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

  const addMethod = () => {
    setClassData((prev) => ({
      ...prev,
      methods: [
        ...prev.methods,
        {
          id: prev.methods.length,
          name: "",
          properties: [],
          returnType: "void",
          visibility: "public",
        },
      ],
    }));
  };

  const addMethodProperty = (methodIndex: number) => {
    setClassData((prev) => {
      const methods = [...prev.methods];
      methods[methodIndex] = {
        ...methods[methodIndex],
        properties: [
          ...methods[methodIndex].properties,
          { name: "", type: "string" },
        ],
      };
      return { ...prev, methods };
    });
  };

  const removeAttribute = (index: number) => {
    setClassData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const removeMethod = (index: number) => {
    setClassData((prev) => ({
      ...prev,
      methods: prev.methods.filter((_, i) => i !== index),
    }));
  };

  const removeMethodProperty = (methodIndex: number, propertyIndex: number) => {
    setClassData((prev) => {
      const methods = [...prev.methods];
      methods[methodIndex] = {
        ...methods[methodIndex],
        properties: methods[methodIndex].properties.filter(
          (_, idx) => idx !== propertyIndex
        ),
      };
      return { ...prev, methods };
    });
  };

  const handleSubmit = () => {
    onSubmit(classData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Abstract Class" : "Create New Abstract Class"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Class Name */}
          <div className="space-y-2">
            <Label htmlFor="className">Abstract Class Name</Label>
            <Input
              id="className"
              value={classData.name}
              onChange={handleNameChange}
              placeholder="Enter abstract class name"
            />
          </div>

          {/* Attributes */}
          <div className="space-y-2">
            <Label className="mr-8">Attributes</Label>
            {classData.attributes.map((attr, index) => (
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
                <Select
                  value={attr.visibility}
                  onValueChange={(value) =>
                    handleAttributeChange(index, "visibility", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visibilityTypes.map((type) => (
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

          {/* Methods */}
          <div className="space-y-2">
            <Label className="mr-8">Methods</Label>
            {classData.methods.map((method, methodIndex) => (
              <div key={method.id} className="space-y-2 border p-2 rounded">
                <div className="flex items-center gap-2">
                  <Input
                    value={method.name}
                    onChange={(e) =>
                      handleMethodChange(methodIndex, "name", e.target.value)
                    }
                    placeholder="Method name"
                    className="flex-1"
                  />
                  <Select
                    value={method.returnType}
                    onValueChange={(value) =>
                      handleMethodChange(methodIndex, "returnType", value)
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
                  <Select
                    value={method.visibility}
                    onValueChange={(value) =>
                      handleMethodChange(methodIndex, "visibility", value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMethod(methodIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="pl-8">
                  {method.properties.map((prop, propIndex) => (
                    <div
                      key={propIndex}
                      className="flex items-center gap-2 mt-2"
                    >
                      <Input
                        value={prop.name}
                        onChange={(e) =>
                          handleMethodPropertyChange(
                            methodIndex,
                            propIndex,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Parameter Name"
                        className="flex-1"
                      />
                      <Select
                        value={prop.type}
                        onValueChange={(value) =>
                          handleMethodPropertyChange(
                            methodIndex,
                            propIndex,
                            "type",
                            value
                          )
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
                        onClick={() =>
                          removeMethodProperty(methodIndex, propIndex)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addMethodProperty(methodIndex)}
                    className="mt-2"
                  >
                    Add Parameter
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMethod}
            >
              Add Method
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

export default AbstracClassEditorDialog;

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

interface ClassAttributes {
  name: string;
  attributes: Attribute[];
  methods: Method[];
}

interface ClassEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData: ClassAttributes) => void;
  initialData?: ClassAttributes;
}

const dataTypes = ["string", "float", "int", "double", "bool", "date"];
const visibilityTypes = ["public", "private", "protected", "package"];

const ClassEditorDialog: React.FC<ClassEditorDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [classData, setClassData] = useState<ClassAttributes>(
    initialData || {
      name: "",
      attributes: [],
      methods: [],
    }
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassData({ ...classData, name: e.target.value });
  };

  const handleAttributeChange = (
    index: number,
    field: "name" | "type" | "visibility",
    value: string
  ) => {
    const attributes = [...classData.attributes];
    attributes[index][field] = value;
    setClassData({ ...classData, attributes });
  };

  const handleMethodChange = (
    methodIndex: number,
    field: "name" | "returnType" | "visibility",
    value: string
  ) => {
    const methods = [...classData.methods];
    methods[methodIndex][field] = value;
    setClassData({ ...classData, methods });
  };

  const handleMethodPropertyChange = (
    methodIndex: number,
    propertyIndex: number,
    field: "name" | "type",
    value: string
  ) => {
    const methods = [...classData.methods];
    methods[methodIndex].properties[propertyIndex][field] = value;
    setClassData({ ...classData, methods });
  };

  const addAttribute = () => {
    setClassData({
      ...classData,
      attributes: [
        ...classData.attributes,
        {
          id: classData.attributes.length,
          name: "",
          type: "string",
          visibility: "public",
        },
      ],
    });
  };

  const addMethod = () => {
    setClassData({
      ...classData,
      methods: [
        ...classData.methods,
        {
          id: classData.methods.length,
          name: "",
          properties: [],
          returnType: "void",
          visibility: "public",
        },
      ],
    });
  };

  const addMethodProperty = (methodIndex: number) => {
    const methods = [...classData.methods];
    methods[methodIndex].properties.push({ name: "", type: "string" });
    setClassData({ ...classData, methods });
  };

  const removeAttribute = (index: number) => {
    const attributes = [...classData.attributes];
    attributes.splice(index, 1);
    setClassData({ ...classData, attributes });
  };

  const removeMethod = (index: number) => {
    const methods = [...classData.methods];
    methods.splice(index, 1);
    setClassData({ ...classData, methods });
  };

  const removeMethodProperty = (methodIndex: number, propertyIndex: number) => {
    const methods = [...classData.methods];
    methods[methodIndex].properties.splice(propertyIndex, 1);
    setClassData({ ...classData, methods });
  };

  const handleSubmit = () => {
    onSubmit(classData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Class Editor</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Class Name */}
          <div className="space-y-2">
            <Label htmlFor="className">Class Name</Label>
            <Input
              id="className"
              value={classData.name}
              onChange={handleNameChange}
              placeholder="Enter class name"
            />
          </div>

          {/* Attributes */}
          <div className="space-y-2 ">
            <Label className="mr-8">Attributes</Label>
            {classData.attributes.map((attr, index) => (
              <div key={index} className="flex items-center gap-2">
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
              <div key={methodIndex} className="space-y-2 border p-2 rounded">
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
                      {[...dataTypes, "void"].map((type) => (
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
                    <div key={propIndex} className="flex items-center gap-2 mt-2">
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
                        placeholder="Property Name"
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
                    className="ml-8 mt-2"
                  >
                    Add Property
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

export default ClassEditorDialog;
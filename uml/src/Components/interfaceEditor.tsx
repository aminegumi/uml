import React, { useState, useEffect } from "react";
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

interface Method {
  id: number;
  name: string;
  properties: { name: string; type: string }[];
  returnType: string;
}

interface InterfaceAttributes {
  name: string;
  methods: Method[];
  extends?: string; // Optional interface extension
}

interface InterfaceEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (interfaceData: InterfaceAttributes) => void;
  initialData?: {
    name: string;
    methods: Method[];
    extends?: string;
  };
}

const emptyInterfaceData: InterfaceAttributes = {
  name: "",
  methods: [],
  extends: "",
};

const dataTypes = ["string", "float", "int", "double", "bool", "date", "void"];

const InterfaceEditorDialog: React.FC<InterfaceEditorDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [interfaceData, setInterfaceData] = useState<InterfaceAttributes>(emptyInterfaceData);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setInterfaceData({
          name: initialData.name,
          methods: initialData.methods.map((method, index) => ({
            ...method,
            id: index,
          })),
          extends: initialData.extends,
        });
      } else {
        setInterfaceData(emptyInterfaceData);
      }
    }
  }, [isOpen, initialData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterfaceData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleExtendsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterfaceData((prev) => ({ ...prev, extends: e.target.value }));
  };

  const handleMethodChange = (
    methodIndex: number,
    field: keyof Method,
    value: string
  ) => {
    setInterfaceData((prev) => {
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
    setInterfaceData((prev) => {
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

  const addMethod = () => {
    setInterfaceData((prev) => ({
      ...prev,
      methods: [
        ...prev.methods,
        {
          id: prev.methods.length,
          name: "",
          properties: [],
          returnType: "void",
        },
      ],
    }));
  };

  const addMethodProperty = (methodIndex: number) => {
    setInterfaceData((prev) => {
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

  const removeMethod = (index: number) => {
    setInterfaceData((prev) => ({
      ...prev,
      methods: prev.methods.filter((_, i) => i !== index),
    }));
  };

  const removeMethodProperty = (methodIndex: number, propertyIndex: number) => {
    setInterfaceData((prev) => {
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
    onSubmit(interfaceData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Interface" : "Create New Interface"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Interface Name */}
          <div className="space-y-2">
            <Label htmlFor="interfaceName">Interface Name</Label>
            <Input
              id="interfaceName"
              value={interfaceData.name}
              onChange={handleNameChange}
              placeholder="Enter interface name"
            />
          </div>

          {/* Extends */}
          <div className="space-y-2">
            <Label htmlFor="extends">Extends (Optional)</Label>
            <Input
              id="extends"
              value={interfaceData.extends}
              onChange={handleExtendsChange}
              placeholder="Enter interface to extend"
            />
          </div>

          {/* Methods */}
          <div className="space-y-2">
            <Label className="mr-8">Methods</Label>
            {interfaceData.methods.map((method, methodIndex) => (
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
            <Button type="button" variant="outline" size="sm" onClick={addMethod}>
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

export default InterfaceEditorDialog;
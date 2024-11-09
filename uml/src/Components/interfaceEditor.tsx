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

interface Method {
  id: number;
  name: string;
  returnType: string;
  visibility: string;
  properties: { name: string; type: string }[]; // Adding properties for methods
}

interface InterfaceAttributes {
  name: string;
  methods: Method[];
}

interface InterfaceEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (interfaceData: InterfaceAttributes) => void;
  initialData?: InterfaceAttributes;
}

const dataTypes = ["string", "float", "int", "double", "bool", "date"];
const visibilityTypes = ["public", "private", "protected", "package"];

const InterfaceEditorDialog: React.FC<InterfaceEditorDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [interfaceData, setInterfaceData] = useState<InterfaceAttributes>(
    initialData || { name: "", methods: [] }
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterfaceData({ ...interfaceData, name: e.target.value });
  };

  const handleMethodChange = (
    methodIndex: number,
    field: "name" | "returnType" | "visibility",
    value: string
  ) => {
    const methods = [...interfaceData.methods];
    methods[methodIndex][field] = value;
    setInterfaceData({ ...interfaceData, methods });
  };

  const handleMethodPropertyChange = (
    methodIndex: number,
    propertyIndex: number,
    field: "name" | "type",
    value: string
  ) => {
    const methods = [...interfaceData.methods];
    methods[methodIndex].properties[propertyIndex][field] = value;
    setInterfaceData({ ...interfaceData, methods });
  };

  const addMethod = () => {
    setInterfaceData({
      ...interfaceData,
      methods: [
        ...interfaceData.methods,
        {
          id: interfaceData.methods.length,
          name: "",
          returnType: "void",
          visibility: "public",
          properties: [], // Initial empty properties for each method
        },
      ],
    });
  };

  const addMethodProperty = (methodIndex: number) => {
    const methods = [...interfaceData.methods];
    methods[methodIndex].properties.push({ name: "", type: "string" });
    setInterfaceData({ ...interfaceData, methods });
  };

  const removeMethod = (index: number) => {
    const methods = [...interfaceData.methods];
    methods.splice(index, 1);
    setInterfaceData({ ...interfaceData, methods });
  };

  const removeMethodProperty = (methodIndex: number, propertyIndex: number) => {
    const methods = [...interfaceData.methods];
    methods[methodIndex].properties.splice(propertyIndex, 1);
    setInterfaceData({ ...interfaceData, methods });
  };

  const handleSubmit = () => {
    onSubmit(interfaceData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Interface Editor</DialogTitle>
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

                {/* Method Properties */}
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

export default InterfaceEditorDialog;

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/prisma";

interface Employee {
  employee: {
    id: string;
    staffName: string;
    staffId: string;
    position: string;
  }[];
}

interface FormData {
  staffName: string;
  staffId: string;
  position: string;
  id: string;
}

const Home = ({ employee }: Employee) => {
  const [form, setForm] = useState<FormData>({
    staffId: "",
    staffName: "",
    position: "",
    id: "",
  });
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    try {
      fetch("http://localhost:3000/api/employee/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({
          staffId: "",
          staffName: "",
          position: "",
          id: "",
        });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteEmployee(id: string) {
    try {
      fetch(`http://localhost:3000/api/employee/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function update(data: FormData) {
    try {
      fetch("http://localhost:3000/api/employee/update", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({
          staffId: "",
          staffName: "",
          position: "",
          id: "",
        });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (data: FormData) => {
    setIsEdit(true);
    setForm({
      staffId: data.staffId,
      staffName: data.staffName,
      position: data.position,
      id: data.id,
    });
  };

  const handleSubmit = async (data: FormData) => {
    try {
      if (isEdit) {
        update(data);
      } else {
        create(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Employee</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="staffId"
          value={form.staffId}
          onChange={(e) => setForm({ ...form, staffId: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <input
          type="text"
          placeholder="staffName"
          value={form.staffName}
          onChange={(e) => setForm({ ...form, staffName: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <input
          type="text"
          placeholder="position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />

        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {employee.map((value) => (
            <li key={value.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">staffId : {value.staffId}</h3>
                  <p className="text-sm">staffName : {value.staffName}</p>
                  <p className="text-sm">position :{value.position}</p>
                </div>
                <button
                  onClick={() =>
                    handleEdit({
                      staffId: value.staffId,
                      staffName: value.staffName,
                      position: value.position,
                      id: value.id,
                    })
                  }
                  className="bg-blue-500 mr-3 px-3 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteEmployee(value.id)}
                  className="bg-red-500 px-3 text-white rounded"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const employee = await prisma.employee.findMany({
    select: {
      staffId: true,
      id: true,
      staffName: true,
      position: true,
    },
  });

  return {
    props: {
      employee,
    },
  };
};

const Employee = require("../models/Employee");
const moment = require("moment");

exports.addEmployee = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      department,
      salary,
      permanentAddress,
      currentAddress,
    } = req.body;

    // Parse and validate DOB
    const parsedDob = moment(dob, "YYYY-MM-DD", true);
    if (!parsedDob.isValid()) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const age = moment().diff(parsedDob, "years");
    if (age < 18) {
      return res
        .status(400)
        .json({ message: "Employee must be at least 18 years old." });
    }

    // Generate unique loginId
    const loginBase = `${firstName[0]}${lastName}`.toLowerCase();
    let loginId = loginBase;
    let attempt = 0;
    while (await Employee.findOne({ loginId })) {
      loginId = loginBase + Math.floor(100 + Math.random() * 900);
      if (++attempt > 10) break;
    }

    // Generate employeeId
    const empCount = await Employee.countDocuments();
    const employeeId = `EMP${(empCount + 1).toString().padStart(5, "0")}`;

    // Create employee
    const employee = new Employee({
      employeeId,
      firstName,
      middleName,
      lastName,
      loginId,
      dob: parsedDob.toDate(),
      department,
      salary,
      permanentAddress,
      currentAddress,
      idProof: req.file?.filename || "",
    });

    await employee.save();
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      dobFrom,
      dobTo,
      department,
    } = req.query;

    const filter = {};

    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { employeeId: regex },
        { firstName: regex },
        { middleName: regex },
        { lastName: regex },
        { loginId: regex },
        { department: regex },
      ];
    }

    if (department) {
      // If department dropdown is provided separately, override any search-based match
      filter.department = department;
    }

    if (dobFrom || dobTo) {
      filter.dob = {};
      if (dobFrom)
        filter.dob.$gte = moment(dobFrom, "YYYY-MM-DD").startOf("day").toDate();
      if (dobTo)
        filter.dob.$lte = moment(dobTo, "YYYY-MM-DD").endOf("day").toDate();
    }

    const skip = (page - 1) * limit;
    const total = await Employee.countDocuments(filter);
    const employees = await Employee.find(filter)
      .skip(skip)
      .limit(Number(limit));

    res.json({ total, employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate DOB if provided
    if (req.body.dob) {
      const parsedDob = moment(req.body.dob, "YYYY-MM-DD", true);
      if (!parsedDob.isValid()) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }
      const age = moment().diff(parsedDob, "years");
      if (age < 18) {
        return res
          .status(400)
          .json({ message: "Employee must be at least 18 years old." });
      }
      req.body.dob = parsedDob.toDate();
    }

    // Update employee with new data
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee details by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get employee history by employee ID
exports.getEmployeeHistory = async (req, res) => {
  try {
    const employeeId = req.params.id;
    // Adjust according to how you store history:
    // For example, if you have an EmployeeHistory collection storing changes by employeeId
    const history = await EmployeeHistory.find({ employeeId }).sort({
      date: -1,
    });

    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
